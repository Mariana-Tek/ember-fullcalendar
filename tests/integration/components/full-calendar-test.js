import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { addDays, setHours } from 'date-fns';

import dayGridPlugin from '@fullcalendar/daygrid';

const defaultDate = new Date('1999-01-01T23:00:00');
const generateDay = day => ({
    start: addDays(setHours(defaultDate, 12), day),
    title: 'a thing',
});

module('FullCalendar', (hooks) => {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
        const events = [0].map(generateDay);

        this.setProperties({
            defaultDate,
            events,
            plugins: [dayGridPlugin],
        });
    });

    test('events are rendered', async (assert) => {
        assert.expect(3);

        await render(hbs`
            <FullCalendar
                @defaultDate={{this.defaultDate}}
                @events={{this.events}}
                @plugins={{this.plugins}}
            />
        `);

        assert.dom('.fc-event-container').exists({ count: 1 }, 'the event passed is rendered');
        assert.dom('.fc-time').hasText('12p', 'correct time is rendered');
        assert.dom('.fc-title').hasText('a thing', 'correct title is rendered');
    });

    test('fullcalendar API functions through calendarRef', async function (assert) {
        assert.expect(2);

        const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const events = days.map(generateDay);

        this.setProperties({
            defaultView: 'dayGridMonth',
            events,
            ourCalendarRef: null,
        });

        await render(hbs`
            <FullCalendar
                @defaultDate={{this.defaultDate}}
                @defaultView={{this.defaultView}}
                @events={{this.events}}
                @getFullCalendarRef={{action (mut this.ourCalendarRef)}}
                @plugins={{this.plugins}}
            />
        `);

        assert.dom('.fc-event-container').exists({ count: 10 });

        this.ourCalendarRef.changeView('dayGridWeek');
        // this.set('defaultView', 'dayGridWeek');

        assert.dom('.fc-event-container').exists({ count: 1 });
    });

    test('events attribute updates events', async function (assert) {
        assert.expect(2);

        await render(hbs`
            <FullCalendar
                @defaultDate={{this.defaultDate}}
                @defaultView='dayGridMonth'
                @events={{this.events}}
                @plugins={{this.plugins}}
            />
        `);

        assert.dom('.fc-event-container').exists({ count: 1 });

        this.set('events', [2, 3, 4, 5, 8, 9].map(generateDay));

        assert.dom('.fc-event-container').exists({ count: 6 });
    });

    test('events attribute updates events', async function (assert) {
        assert.expect(2);

        await render(hbs`
            <FullCalendar
                @defaultDate={{this.defaultDate}}
                @defaultView='dayGridMonth'
                @events={{this.events}}
                @plugins={{this.plugins}}
            />
        `);

        assert.dom('.fc-event-container').exists({ count: 1 });

        this.set('events', [2, 3, 4, 5, 8, 9].map(generateDay));

        assert.dom('.fc-event-container').exists({ count: 6 });
    });

    test('component attribute updates fullcalendar setting', async function (assert) {
        assert.expect(2);

        this.set(
            'header',
            {
                left: 'title',
                center: '',
                right: 'today prev,next',
            },
        );

        await render(hbs`
            <FullCalendar
                @defaultDate={{this.defaultDate}}
                @events={{this.events}}
                @header={{this.header}}
                @plugins={{this.plugins}}
            />
        `);

        this.set(
            'header',
            {
                left: 'today prev,next',
                center: '',
                right: 'title',
            },
        );

        assert.dom('.fc-left').hasText('today');
        assert.dom('.fc-right').hasText('January 1999');
    });

    test('component ignores extra attributes', async (assert) => {
        assert.expect(1);

        await render(hbs`
            <FullCalendar
                @apple='banana'
                @defaultDate={{this.defaultDate}}
                @events={{this.events}}
                @plugins={{this.plugins}}
            />
        `);

        assert.dom('.fc').exists('component still renders');
    });
});
