/* 
- Queue: linked list based
- operations
---- [enqueue]: adds element to the end of the queue, throws 'queue full' exception
---- [dequeue]: returns and removes the front element, throws 'queue empty' exception
---- [top]:     returns the front element, throws 'queue empty' exception
- apis
---- [size]:    returns the current size of the queue
---- [setCapacity]: sets maximum capacity of the queue, throws 'invalid capacity value' exception
---- [getCapacity]: gets the current capacity
---- [print]: prints the entire elements for debugging
*/

var JSQueueNode = function (val, nxt) {
    return {
        value: val,
        next: nxt
    };
}

var JSQueue = function () {

    var defaultCapacity = 1000;

    return {
        // private 
        capacity: defaultCapacity,
        head: null,
        tail: null,
        size_: 0,

        // public
        // add element to the queue, at the 'tail'
        enqueue: function (element) {

            if (this.size() == this.capacity)
                throw this.ex.enqueue_full;

            var newNode = new JSQueueNode(element, null);

            // if queue is empty
            if (this.head == null && this.tail == null) {
                this.head = this.tail = newNode;
            }
            else {
                this.tail.next = newNode;
                this.tail = this.tail.next;
            }

            this.size_++;
        },

        dequeue: function () {

            if (this.size() == 0)
                throw this.ex.dequeue_empty;

            var element = this.head; // node to free
            var val = element.value; // val to return

            element = null; // garbage collector will take care from here
            this.head = this.head.next;
            this.size_--;

            if (this.size_ == 0)
                this.tail = null;

            return val;
        },

        top: function () {
            if (this.size() == 0)
                throw this.ex.top_empty;

            return this.head.value;
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

            printVal += ' [Tail]'
            return printVal;
        },

        ex: {
            enqueue_full: '[queue.enqueue] queue is full.',
            dequeue_empty: '[queue.dequeue] queue is empty.',
            top_empty: '[queue.top] queue is empty.',
            invalid_capacity: '[queue.setCap] capacity can\'t be set to less than current size.'
        }
    };
};