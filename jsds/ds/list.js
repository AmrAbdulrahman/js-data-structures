/* 
- linked list, based on nodes
- operations
---- [push_back]: adds element to the end of the list, throws 'list full' exception
---- [push_front]: adds element to the start of the list, throws 'list full' exception
---- [insert]: inserts element at specific index, throws 'index out of range' exception, 'list_full'
---- [remove]: removes element at specific index, throws 'index out of range' exception
---- [at]: returns element at index, throws 'index out of range' exception
- apis
---- [size]:    returns the current size of the list
---- [setCapacity]: sets maximum capacity of the list, throws 'invalid capacity value' exception
---- [getCapacity]: gets the current capacity
---- [print]: prints the entire elements for debugging
*/

var JSListNode = function (val, nxt) {
    return {
        value: val,
        next: nxt
    };
}

var JSList = function () {

    var defaultCapacity = 1000;

    return {
        // private 
        capacity: defaultCapacity,
        head: null,
        tail: null,
        size_: 0,

        // public
        // add element to the list, in the 'tail'
        push_back: function (element) {

            if (this.size() == this.capacity)
                throw this.ex.list_full;

            var newNode = new JSListNode(element, null);

            // if list is empty
            if (this.head == null && this.tail == null) {
                this.head = this.tail = newNode;
            }
            else {
                this.tail.next = newNode;
                this.tail = this.tail.next;
            }

            this.size_++;
        },

        push_front: function (element) {

            if (this.size() == this.capacity)
                throw this.ex.list_full;

            var newNode = new JSListNode(element, null);

            // if list is empty
            if (this.head == null && this.tail == null) {
                this.head = this.tail = newNode;
            }
            else {
                var currentHead = this.head;
                this.head = newNode;
                this.head.next = currentHead;
            }

            this.size_++;
        },

        insert: function (element, index) {

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

        getCapacity: function () {
            return this.capacity;
        },

        print: function () {
            var printVal = '[Size:' + this.size() + '] [Front]'

            var node = this.head;

            while (node != null) {
                printVal += ' -> ' + node.value;
                node = node.next;
            }

            printVal += ' [Back]'
            return printVal;
        },

        ex: {
            list_full: '[list.push] list is full.',
            index_out_of_range: '[list] index out of range.'
        }
    };
};