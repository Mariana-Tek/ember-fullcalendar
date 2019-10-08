const getComponentAttrs = emberComponentObject => Object.keys(emberComponentObject.attrs)
    .reduce((attrs, attrName) => {
        attrs[attrName] = emberComponentObject[attrName];

        return attrs;
    }, {});

export default getComponentAttrs;
