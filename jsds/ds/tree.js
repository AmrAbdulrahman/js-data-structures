/* 
- linked list, based on nodes
- operations
---- [add]: adds element to its appropriate place in the tree, throws 'tree full' exception
---- [find]: returns true if element exist
---- [remove]: removes element, return true if element exists, false if element doesn't exist
- apis
---- [size]:    returns the current size of the list
---- [height]:    returns the height of the tree
---- [setCapacity]: sets maximum capacity of the list, throws 'invalid capacity value' exception
---- [getCapacity]: gets the current capacity
---- [print]: prints the entire elements for debugging
*/

var JSTreeNode = function (val, left, right) {
    
    left = left || null;
    right = right || null;

    return {
        value: val,
        left: left,
        right: right
    };
}

var JSTree = function (comparer) {

    var defaultCapacity = 1000;

    var Comparer = comparer || function (element1, element2) {
        if (element1 == element2)
            return 0;
        if (element1 < element2)
            return -1;
        else
            return 1;
    };

    // var nullRoot = new JSTreeNode(null, null, null);

    return {
        // private 
        capacity: defaultCapacity,
        root: null,
        size_: 0,
        height_: 0,
        comparer: Comparer,

        // public
        add: function (element) {

            if (element == null)
                throw this.ex.invalid_value;

            if (this.size() == this.capacity)
                throw this.ex.tree_full;

            if (this.size() == 0) {
                this.root = new JSTreeNode(element, new JSTreeNode(null), new JSTreeNode(null));
                this.size_ = this.height_ = 1;
                return;
            }

            var node = this.root;
            var height = 1;

            // get to the appropriate node
            while (node.value != null) {
                var comp = this.comparer(element, node.value);

                if (comp == 0) // node already exists
                    return;

                height++;

                if (comp < 0)
                    node = node.left;
                else
                    node = node.right;
            }

            node.value = element;
            node.left = new JSTreeNode(null);
            node.right = new JSTreeNode(null);

            this.size_++;
            this.height_ = height > this.height_ ? height : this.height_;
        },

        find: function (element) {

            if (element == null)
                throw this.ex.invalid_value;

            var node = this.root;

            while (node != null && node.value != null) {
                var comp = this.comparer(element, node.value);

                if (comp == 0) // node found
                    return true;

                if (comp < 0)
                    node = node.left;
                else
                    node = node.right;
            }

            return false;
        },

        remove: function (element, index) {

            if (index < 0 || index >= this.size())
                throw this.ex.index_out_of_range;

            if (this.size() == this.capacity)
                throw this.ex.list_full;

            if (index == 0) {
                this.push_front(element);
            }
            else {

                var nodePrev = this.head;

                while (--index)
                    nodePrev = nodePrev.next;

                var newNode = new JSListNode(element, nodePrev.next);
                nodePrev.next = newNode;
                this.size_++;
            }
        },

        remove: function (index) {
            if (index < 0 || index >= this.size())
                throw this.ex.index_out_of_range;

            var nodePrev = this.head;

            while (--index)
                nodePrev = nodePrev.next;

            nodePrev = nodePrev.next.next;
            this.size_--;
        },

        at: function (index) {
            if (index < 0 || index >= this.size())
                throw this.ex.index_out_of_range;

            var node = this.head;

            while (index--)
                node = node.next;

            return node.value;
        },

        setCapacity: function (capacity) {
            if (capacity < this.size())
                throw this.ex.invalid_capacity;

            this.capacity = capacity;
        },

        size: function () {
            return this.size_;
        },

        height: function () {
            return this.height_;
        },

        getCapacity: function () {
            return this.capacity;
        },

        print: function () {

            var printVal = '[Size:' + this.size() + '] [height:' + this.height() + '] \n';

            var node = this.root;
            var rowIndex = 0;

            var q = new JSQueue();
            q.enqueue({ node: node, rowIndex: rowIndex });

            var currentRowIndex = 0;
            var baseLen = 1;
            for (var i = 1; i < this.height(); i++)
                baseLen *= 2;

            var spaceCount = baseLen * 2 - 1;
            var startAt = baseLen - 1;
            printVal += this.generateStr(' ', startAt);

            while (currentRowIndex < this.height()) {

                //    debugger;
                var elem = q.dequeue();
                var node = elem.node;
                var rowIndex = elem.rowIndex;

                if (rowIndex != currentRowIndex && currentRowIndex != this.height()) {
                    printVal += '\n';
                    currentRowIndex = rowIndex;

                    baseLen /= 2;
                    spaceCount = baseLen * 2 - 1;
                    startAt = baseLen - 1;
                    printVal += this.generateStr(' ', startAt);
                }

                if (currentRowIndex == this.height())
                    break;



                var spacing = '';
                for (var i = 0; i < spaceCount; i++)
                    spacing += ' ';

                if (node == null || node.value == null) {
                    q.enqueue({ node: null, rowIndex: rowIndex + 1 });
                    q.enqueue({ node: null, rowIndex: rowIndex + 1 });

                    if(node == null)
                        printVal += ' ' + spacing;
                    else
                        printVal += 'X' + spacing;
                }

                else {
                    if (node.left.value != null)
                        q.enqueue({ node: node.left, rowIndex: rowIndex + 1 });
                    else
                        q.enqueue({ node: { value: null }, rowIndex: rowIndex + 1 });

                    if (node.right.value != null)
                        q.enqueue({ node: node.right, rowIndex: rowIndex + 1 });
                    else
                        q.enqueue({ node: { value: null }, rowIndex: rowIndex + 1 });

                    printVal += node.value + spacing;
                }



            }

            return printVal;
        },

        generateStr: function (char, count) {
            if (count < 0)
                return '';

            var res = '';

            while (count--)
                res += char;

            return res;
        },

        ex: {
            tree_full: '[tree.add] tree is full.',
            invalid_value: '[tree.add] can\'t add (null) value'
        }
    };
};


////xxxxxxx1xxxxxxxx
////xxxxxxxxxxxxxxxx
////xxxxxxxxxxxxxxxx
////xxxxxxxxxxxxxxxx
////xxxxxxxxxxxxxxxx         
//
//
//
////        5
////    1    10
////  X  3  X  11
//// X X X X X X X 12
//
//
//
//
//
//
//       X
//   X       X
// X   X   X   X  
//X X X X X X X X
//
//
//7   15
//3   7
//1   3
//0   1
//
//
//index:0
//h:4
//base:2*2*2 = 8
//startAt: base
