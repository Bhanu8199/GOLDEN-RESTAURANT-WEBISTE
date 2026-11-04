document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.whatsapp-form');

  forms.forEach(form => {
    if (form.id === 'booking-form') {
      const bookingType = form.querySelector('#booking-type');
      const eventType = form.querySelector('#event-type');
      const submitButton = form.querySelector('button[type="submit"]');

      if (bookingType && eventType && submitButton) {
        bookingType.addEventListener('change', () => {
          const isEventHall = bookingType.value === 'Event Hall';
          eventType.replaceChildren();

          if (isEventHall) {
            eventType.add(new Option('Choose event type', '', true, true));
            eventType.options[0].disabled = true;
            ['Private Party', 'Marriage Party', 'Birthday Party', 'Custom Party'].forEach(eventName => {
              eventType.add(new Option(eventName, eventName));
            });
            eventType.disabled = false;
            eventType.required = true;
          } else {
            eventType.add(new Option("Don't need to select", "Don't need to select", true, true));
            eventType.disabled = false;
            eventType.required = false;
          }

          submitButton.textContent = bookingType.value
            ? (isEventHall ? 'Book an Event Hall' : 'Book Now')
            : 'Select Booking Type';
          form.dataset.whatsappIntro = isEventHall
            ? "Hello, I'd like to book an event hall."
            : "Hello, I'd like to book a table.";
        });
      }
    }

    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(form);
      const labels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        bookingType: 'Booking type',
        eventType: 'Event type',
        date: 'Date',
        time: 'Time',
        people: 'Number of people',
        subject: 'Subject',
        message: 'Message'
      };
      const fields = Array.from(form.elements)
        .filter(element => element.name && element.type !== 'submit')
        .map(element => {
          const value = formData.get(element.name);
          const label = labels[element.name] || element.name;
          return `${label}: ${typeof value === 'string' && value.trim() ? value.trim() : 'Not provided'}`;
        });
      const message = [form.dataset.whatsappIntro, '', ...fields].join('\n');

      window.location.assign(`https://wa.me/919347978199?text=${encodeURIComponent(message)}`);
    });
  });
});
