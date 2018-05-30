import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

let prettifyContact = (contact) => {
    return {
        id: contact.sfid,
        email: contact.email
    };
};

@Injectable()
export class ContactService {

    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
        this.CurrentContact;
    }

    getContactByEmail(email) {
        return this.http.get('/contact?email=' + email).map(response => {
            var contact;
            try {
                contact = prettifyContact(response.json());
            } catch (e) { };
            this.CurrentContact = contact;
            return contact;
        });
    }
}