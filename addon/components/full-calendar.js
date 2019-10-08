import { Calendar } from '@fullcalendar/core';
import Component from '@ember/component';
import equal from 'fast-deep-equal';
import getComponentAttrs from '../utils/get-component-attrs';
import layout from '../templates/components/full-calendar';
import { set, setProperties } from '@ember/object';


export default Component.extend({
    layout,

    didInsertElement() {
        this._super(...arguments);

        const { elementId, getFullCalendarRef } = this;
        const attrs = getComponentAttrs(this);
        const calendarRef = new Calendar(
            document.getElementById(elementId),
            attrs,
        );

        setProperties(this, {
            calendarRef,
            cachedAttrs: attrs,
        });

        if (getFullCalendarRef) getFullCalendarRef(calendarRef);

        this.calendarRef.render();
    },

    didUpdateAttrs() {
        this._super(...arguments);

        const { cachedAttrs, calendarRef } = this;
        const newAttrs = getComponentAttrs(this);
        const removals = Object.keys(cachedAttrs).filter(attrName => !(attrName in newAttrs));
        const updates = Object.keys(newAttrs)
            .reduce((updatesObj, attrName) => {
                if (!equal(newAttrs[attrName], cachedAttrs[attrName])) {
                    updatesObj[attrName] = newAttrs[attrName];
                }

                return updatesObj;
            }, {});

        calendarRef.mutateOptions(updates, removals, false, equal);

        set(this, 'cachedAttrs', newAttrs);
    },

    willDestroyElement() {
        this._super(...arguments);

        this.calendarRef.destroy();
    },
});
