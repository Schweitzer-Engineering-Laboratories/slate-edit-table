const insertRow = require('./transforms/insertRow');
const deleteRow = require('./transforms/deleteRow');
const insertColumn = require('./transforms/insertColumn');
const deleteColumn = require('./transforms/deleteColumn');
const moveSelection = require('./transforms/moveSelection');

const onEnter       = require('./onEnter');
const onTab         = require('./onTab');
const onBackspace   = require('./onBackspace');
const onUpDown      = require('./onUpDown');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';
const KEY_DOWN      = 'down';
const KEY_UP        = 'up';

function EditTable(opts) {
    opts           = opts || {};
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow   = opts.typeRow || 'table_row';
    opts.typeCell  = opts.typeCell || 'table_cell';

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        const { startBlock } = state;

        // Only handle events in cells
        return (startBlock.type === opts.typeCell);
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        // Only handle events in cells
        if (!isSelectionInTable(state)) {
            return;
        }

        // Build arguments list
        const args = [
            e, data, state,
            opts
        ];

        switch (data.key) {
        case KEY_ENTER:
            return onEnter.apply(null, args);
        case KEY_TAB:
            return onTab.apply(null, args);
        case KEY_BACKSPACE:
            return onBackspace.apply(null, args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown.apply(null, args);
        }
    }

    return {
        onKeyDown,

        utils: {
            isSelectionInTable
        },

        transforms: {
            insertRow:     insertRow.bind(null, opts),
            deleteRow:     deleteRow.bind(null, opts),
            insertColumn:  insertColumn.bind(null, opts),
            deleteColumn:  deleteColumn.bind(null, opts),
            moveSelection: moveSelection.bind(null, opts)
        }
    };
}

module.exports = EditTable;