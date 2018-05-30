import { OnInit } from '@angular/core';
import { Page, NavController, NavParams, Alert, ActionSheet } from 'ionic-angular';
import { BrokerDetailsPage } from '../broker-details/broker-details';
import { PropertyService } from '../../services/property-service';
import { ContactService } from '../../services/contact-service';
import { ActivityService } from '../../services/activity-service';

@Page({
    templateUrl: 'build/pages/property-details/property-details.html'
})
export class PropertyDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [PropertyService], [ContactService], [ActivityService]];
    }

    constructor(nav, navParams, propertyService, contactService, activityService) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.property = navParams.get('property');
        this.contactService = contactService;
        this.activityService = activityService;
    }

    ngOnInit() {
        this.activityService.addActivity(
            {
                'action': 'Viewed a property',
                'contact': this.contactService.CurrentContact.id,
                'property': this.property.id
            }
        ).subscribe(() => { });
        this.propertyService.findById(this.property.id).subscribe(property => this.property = property);
    }

    favorite(event, property) {

        this.activityService.addActivity(
            {
                'action': 'Favorited a property',
                'contact': this.contactService.CurrentContact.id,
                'property': property.id
            }
        ).subscribe(() => { });

        this.propertyService.favorite(property, this.contactService.CurrentContact.id).subscribe(() => {
            let alert = Alert.create({
                title: 'Favorites',
                subTitle: 'Property added to your favorites',
                buttons: ['OK']
            });
            this.nav.present(alert);
        });

    }

    like(event, property) {
        // Simulated in this sample. See "Favorite" for similar functionality.
        this.property.likes++;
    }

    share(event, property) {
        let actionSheet = ActionSheet.create({
            buttons: [
                {
                    text: 'Text',
                    handler: () => {
                        console.log('Text clicked');
                    }
                },
                {
                    text: 'Email',
                    handler: () => {
                        console.log('Email clicked');
                    }
                },
                {
                    text: 'Facebook',
                    handler: () => {
                        console.log('Facebook clicked');
                    }
                },
                {
                    text: 'Twitter',
                    handler: () => {
                        console.log('Twitter clicked');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        this.nav.present(actionSheet);
    }

    showBroker(event, broker) {
        this.nav.push(BrokerDetailsPage, {
            broker: broker
        });
    }

}