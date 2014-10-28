/* 
- array based stack
- operations
---- [push]:    adds element to the top of the stack, throws 'stack full' exception
---- [pop]:     returns and removes the top element, throws 'stack empty' exception
---- [top]:     returns the top element, throws 'stack empty' exception
- apis
---- [size]:    returns the current size of the stack
---- [setCapacity]: sets maximum capacity of the stack, throws 'invalid capacity value' exception
---- [getCapacity]: gets the current capacity
---- [print]: prints the entire elements for debugging
*/
var JSStack = function () {

    var defaultCapacity = 1000;

    return {
        // private 
        capacity: defaultCapacity,
        elements: new Array(),
        topIndex: function () { return this.elements.length - 1 },


        // public
        push: function (element) {

            if (this.size() == this.capacity)
                throw this.ex.push_full;

            this.elements.push(element);

        },

        pop: function () {

            if (this.topIndex() == -1)
                throw this.ex.pop_empty;

            var element = this.elements[this.topIndex()];
            this.elements.splice(this.topIndex(), 1);
            return element;
        },

        top: function () {

            if (this.topIndex() == -1)
                throw this.ex.top_empty;

            return this.elements[this.topIndex()];
        },

        size: function () {
            return this.elements.length;
        },

        setCapacity: function (capacity) {
            if (capacity < this.size())
                throw this.ex.invalid_capacity;

            this.capacity = capacity;
        },

        getCapacity: function () {
            return this.capacity;
        },

        print: function () {
            var printVal = '[Size:' + this.size() + '] [Top]';

            for (var i = 0; i < this.size(); i++) {
                printVal += ' ->' + this.elements[i];
            }

            printVal += ' [Bottom]';
            return printVal;
        },

        ex: {
            push_full: '[stack.push] stack is full.',
            pop_empty: '[stack.pop] stack is empty.',
            top_empty: '[stack.top] stack is empty.',
            invalid_capacity: '[stack.setCap] capacity can\'t be set to less than current size.'
        }
    };
};