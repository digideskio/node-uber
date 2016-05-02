var common = require("./common"),
    nock = common.nock,
    should = common.should,
    uber = common.uber;

var reminderReply = {
    "event": {
        "name": "Frisbee with friends",
        "location": "Dolores Park",
        "latitude": 37.759773,
        "longitude": -122.427063,
        "time": 1429294463
    },
    "product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d",
    "reminder_id": "def-456",
    "reminder_time": 1429294463,
    "reminder_status": "pending",
    "trip_branding": {
        "link_text": "View team roster",
        "partner_deeplink": "partner://team/9383"
    }
};


before(function() {
    nock('https://api.uber.com')
        .get('/v1/reminders/def-456?server_token=SERVERTOKENSERVERTOKENSERVERTOKENSERVERT')
        .times(2)
        .reply(200, reminderReply);
    nock('https://api.uber.com', {
            reqheaders: {
                'Authorization': 'Token ' + uber.defaults.server_token
            }
        })
        .post('/v1/reminders')
        .times(2)
        .reply(200, reminderReply);
    nock('https://api.uber.com', {
            reqheaders: {
                'Authorization': 'Token ' + uber.defaults.server_token
            }
        })
        .patch('/v1/reminders/def-456')
        .times(2)
        .reply(200, reminderReply);
    nock('https://api.uber.com', {
            reqheaders: {
                'Authorization': 'Token ' + uber.defaults.server_token
            }
        })
        .delete('/v1/reminders/def-456')
        .times(2)
        .reply(204);
});

it('should create new reminder', function(done) {
    uber.reminders.createReminder({
        reminder_time: 1429294463,
        phone_number: 16508420126,
        event: {
            time: 1429294463,
            name: 'Frisbee with friends',
            location: 'Dolores Park',
            latitude: 37.759773,
            longitude: -122.427063,
            product_id: 'a1111c8c-c720-46c3-8534-2fcdd730040d'
        },
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        should.not.exist(err);
        res.should.deep.equal(reminderReply);
        done();
    });
});

it('should return error if there is no required params for POST', function(done) {
    uber.reminders.createReminder(null, function(err, res) {
        err.message.should.equal('Invalid parameters');
        done();
    });
});

it('should return error if reminder time is missing for POST', function(done) {
    uber.reminders.createReminder({
        phone_number: 16508420126,
        event: {
            time: 1429294463,
            name: 'Frisbee with friends',
            location: 'Dolores Park',
            latitude: 37.759773,
            longitude: -122.427063,
            product_id: 'a1111c8c-c720-46c3-8534-2fcdd730040d'
        },
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        err.message.should.equal('Missing parameter: reminder_time');
        done();
    });
});

it('should return error if phone number is missing for POST', function(done) {
    uber.reminders.createReminder({
        reminder_time: 1429294463,
        event: {
            time: 1429294463,
            name: 'Frisbee with friends',
            location: 'Dolores Park',
            latitude: 37.759773,
            longitude: -122.427063,
            product_id: 'a1111c8c-c720-46c3-8534-2fcdd730040d'
        },
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        err.message.should.equal('Missing parameter: phone_number');
        done();
    });
});

it('should return error if event object is missing for POST', function(done) {
    uber.reminders.createReminder({
        phone_number: 16508420126,
        reminder_time: 1429294463,
        event: {
            name: 'Frisbee with friends',
            location: 'Dolores Park',
            latitude: 37.759773,
            longitude: -122.427063,
            product_id: 'a1111c8c-c720-46c3-8534-2fcdd730040d'
        },
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        err.message.should.equal('Missing parameter: event.time');
        done();
    });
});

it('should return error if event.time is missing for POST', function(done) {
    uber.reminders.createReminder({
        phone_number: 16508420126,
        reminder_time: 1429294463,
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        err.message.should.equal('Missing parameter: event');
        done();
    });
});

it('should get existing reminder by ID', function(done) {
    uber.reminders.getReminderByID('def-456', function(err, res) {
        should.not.exist(err);
        res.should.deep.equal(reminderReply);
        done();
    });
});

it('should return error in case of missing reminder ID', function(done) {
    uber.reminders.getReminderByID(null, function(err, res) {
        err.message.should.equal('Invalid reminder_id');
        done();
    });
});

it('should patch an existing reminder by ID', function(done) {
    uber.reminders.updateReminderByID('def-456', {
        reminder_time: 1429294463,
        phone_number: 16508420126,
        event: {
            time: 1429294463,
            name: 'Frisbee with friends',
            location: 'Dolores Park',
            latitude: 37.759773,
            longitude: -122.427063,
            product_id: 'a1111c8c-c720-46c3-8534-2fcdd730040d'
        },
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        should.not.exist(err);
        res.should.deep.equal(reminderReply);
        done();
    });
});

it('should return error in case of missing reminder ID for patch', function(done) {
    uber.reminders.updateReminderByID(null, {
        reminder_time: 1429294463,
        phone_number: 16508420126,
        event: {
            time: 1429294463,
            name: 'Frisbee with friends',
            location: 'Dolores Park',
            latitude: 37.759773,
            longitude: -122.427063,
            product_id: 'a1111c8c-c720-46c3-8534-2fcdd730040d'
        },
        trip_branding: {
            link_text: 'View team roster',
            partner_deeplink: 'partner://team/9383'
        }
    }, function(err, res) {
        err.message.should.equal('Invalid reminder_id');
        done();
    });
});

it('should return error in case of missing parameters for patch', function(done) {
    uber.reminders.updateReminderByID('def-456', null, function(err, res) {
        err.message.should.equal('Invalid parameters');
        done();
    });
});

it('should delete an existing reminder by ID', function(done) {
    uber.reminders.deleteReminderByID('def-456', function(err, res) {
        should.not.exist(err);
        done();
    });
});

it('should return error in case of missing reminder ID for delete', function(done) {
    uber.reminders.deleteReminderByID(null, function(err, res) {
        err.message.should.equal('Invalid reminder_id');
        done();
    });
});