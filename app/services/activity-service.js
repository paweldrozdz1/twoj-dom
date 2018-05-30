import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ActivityService {

    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
    }

    addActivity(activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/activity',
            JSON.stringify({
                'name': activity.action,
                'broker__c': activity.broker,
                'contact__c': activity.contact,
                'property__c': activity.property
            }), { headers: headers });
    }
}