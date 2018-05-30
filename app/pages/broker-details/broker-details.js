import { OnInit } from '@angular/core';
import { Page, NavController, NavParams } from 'ionic-angular';
import { BrokerService } from '../../services/broker-service';
import { ContactService } from '../../services/contact-service';
import { ActivityService } from '../../services/activity-service';

@Page({
    templateUrl: 'build/pages/broker-details/broker-details.html'
})
export class BrokerDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [BrokerService], [ContactService], [ActivityService]];
    }

    constructor(nav, navParams, brokerService, contactService, activityService) {
        this.brokerService = brokerService;
        this.broker = navParams.get('broker');
        this.contactService = contactService;
        this.activityService = activityService;
    }

    ngOnInit() {
        this.activityService.addActivity(
            {
                'action': 'Viewed a broker',
                'contact': this.contactService.CurrentContact.id,
                'broker': this.broker.id
            }
        ).subscribe(() => { });

        this.brokerService.findById(this.broker.id).subscribe(broker => this.broker = broker);
    }

}
