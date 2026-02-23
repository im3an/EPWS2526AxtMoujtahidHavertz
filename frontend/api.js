var API_BASE = '/api/v1';

var API = {
    // Missing Reports
    getMissingReports: function() {
        return fetch(API_BASE + '/missing-reports')
            .then(function(res) { 
                if (!res.ok) throw new Error('Failed to fetch reports');
                return res.json(); 
            });
    },

    getMissingReport: function(id) {
        return fetch(API_BASE + '/missing-reports/' + id)
            .then(function(res) { 
                if (!res.ok) throw new Error('Report not found');
                return res.json(); 
            });
    },

    createMissingReport: function(data) {
        return fetch(API_BASE + '/missing-reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) { 
            if (!res.ok) return res.json().then(function(err) { throw err; });
            return res.json(); 
        });
    },

    updateMissingReport: function(id, data) {
        return fetch(API_BASE + '/missing-reports/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) { 
            if (!res.ok) throw new Error('Failed to update');
            return res.json(); 
        });
    },

    deleteMissingReport: function(id) {
        return fetch(API_BASE + '/missing-reports/' + id, {
            method: 'DELETE'
        }).then(function(res) { 
            if (!res.ok) throw new Error('Failed to delete');
        });
    },

    // Areas
    getAreas: function(reportId) {
        return fetch(API_BASE + '/missing-reports/' + reportId + '/areas')
            .then(function(res) { return res.json(); });
    },

    createArea: function(reportId, data) {
        return fetch(API_BASE + '/missing-reports/' + reportId + '/areas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) { 
            if (!res.ok) return res.json().then(function(err) { throw err; });
            return res.json(); 
        });
    },

    updateArea: function(reportId, areaId, data) {
        return fetch(API_BASE + '/missing-reports/' + reportId + '/areas/' + areaId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) { return res.json(); });
    },

    deleteArea: function(reportId, areaId) {
        return fetch(API_BASE + '/missing-reports/' + reportId + '/areas/' + areaId, {
            method: 'DELETE'
        });
    },

    updateAreaPriority: function(reportId, areaId, priority) {
        return fetch(API_BASE + '/missing-reports/' + reportId + '/areas/' + areaId + '?priority=' + priority, {
            method: 'PATCH'
        }).then(function(res) { return res.json(); });
    },

    // Sightings
    getSightings: function(reportId) {
        return fetch(API_BASE + '/missing-report/' + reportId + '/sightings')
            .then(function(res) { return res.json(); });
    },

    createSighting: function(reportId, data) {
        return fetch(API_BASE + '/missing-report/' + reportId + '/sightings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) { 
            if (!res.ok) return res.json().then(function(err) { throw err; });
            return res.json(); 
        });
    },

    deleteSighting: function(reportId, sightingId) {
        return fetch(API_BASE + '/missing-report/' + reportId + '/sightings/' + sightingId, {
            method: 'DELETE'
        });
    },

    // Invitations
    getInvitationByToken: function(token) {
        return fetch(API_BASE + '/invitations/token/' + token)
            .then(function(res) {
                if (!res.ok) throw new Error('Einladung ungültig oder abgelaufen');
                return res.json();
            });
    },

    createInvitation: function(reportId) {
        return fetch(API_BASE + '/invitations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ missingReportId: reportId })
        }).then(function(res) { return res.json(); });
    },

    joinByToken: function(token, data) {
        return fetch(API_BASE + '/invitations/join/' + token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function(res) {
            if (!res.ok) {
                return res.json().then(function(body) {
                    var msg = (body && body.message) ? body.message : ((body && body.error) ? body.error : 'Beitritt fehlgeschlagen');
                    throw new Error(msg);
                });
            }
            return res.json();
        });
    },

    // Participants
    getParticipantsByReport: function(reportId) {
        return fetch(API_BASE + '/participants/missing-report/' + reportId)
            .then(function(res) { return res.json(); });
    },

    // Users
    getUsers: function() {
        return fetch(API_BASE + '/accounts/users')
            .then(function(res) { return res.json(); });
    },

    getUser: function(userId) {
        return fetch(API_BASE + '/accounts/users/' + userId)
            .then(function(res) { return res.json(); });
    },

    createUser: function(userData) {
        return fetch(API_BASE + '/accounts/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(function(res) {
            if (!res.ok) return res.json().then(function(err) { throw err; });
            return res.json();
        });
    },

    updateUser: function(userId, userData) {
        return fetch(API_BASE + '/accounts/users/' + userId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(function(res) {
            if (!res.ok) return res.json().then(function(err) { throw err; });
            return res.json();
        });
    }
};

// Enum mappings for display
var ENUMS = {
    species: {
        'DOG': 'Hund',
        'CAT': 'Katze',
        'OTHER': 'Andere'
    },
    speciesReverse: {
        'Hund': 'DOG',
        'Katze': 'CAT',
        'Andere': 'OTHER',
        'Sonstiges': 'OTHER'
    },
    ageRange: {
        'BABY': 'Baby',
        'YOUNG': 'Jung',
        'ADULT': 'Erwachsen',
        'SENIOR': 'Senior'
    },
    ageRangeReverse: {
        'Welpe/Kitten': 'BABY',
        'Jung (1-3 Jahre)': 'YOUNG',
        'Erwachsen (3-7 Jahre)': 'ADULT',
        'Senior (7+ Jahre)': 'SENIOR'
    },
    petColor: {
        'BLACK': 'Schwarz',
        'WHITE': 'Weiß',
        'BROWN': 'Braun',
        'GRAY': 'Grau',
        'RED': 'Rot',
        'ORANGE': 'Orange',
        'CREME': 'Beige',
        'TRICOLOR': 'Dreifarbig',
        'OTHER': 'Sonstige'
    },
    petColorReverse: {
        'Schwarz': 'BLACK',
        'Weiß': 'WHITE',
        'Braun': 'BROWN',
        'Grau': 'GRAY',
        'Orange/Rot': 'ORANGE',
        'Beige/Creme': 'CREME'
    },
    petSize: {
        'VERYSMALL': 'Sehr klein',
        'SMALL': 'Klein',
        'MEDIUM': 'Mittel',
        'LARGE': 'Groß',
        'VERYLARGE': 'Sehr Groß'
    },
    priority: {
        'LOW': 'Niedrig',
        'MEDIUM': 'Normal',
        'HIGH': 'Hoch'
    },
    priorityReverse: {
        'low': 'LOW',
        'normal': 'MEDIUM',
        'high': 'HIGH'
    },
    priorityColors: {
        'LOW': '#A8E6CF',
        'MEDIUM': '#FFD3B6',
        'HIGH': '#FF8B94'
    },
    areaType: {
        'POLYGON': 'Polygon',
        'CIRCLE': 'Kreis',
        'POINT': 'Punkt'
    }
};

function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString('de-DE');
}

function formatDateTime(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString('de-DE') + ' ' + d.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
}
