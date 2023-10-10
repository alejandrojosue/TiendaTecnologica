module.exports = {
    beforeCreate(event) {
        let { data, where, select, populate } = event.params;

        //   data.isTableFull = data.numOfPeople === 4;
    },

    afterCreate(event) {
        const { result, params } = event;

        // do something to the result
    },

    beforeUpdate(e) {
        const { result, params } = e;
        console.log('erftygfdsas')
    }
};