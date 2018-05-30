import { OnInit } from '@angular/core';
import { Page, NavController } from 'ionic-angular';
import { PropertyDetailsPage } from '../property-details/property-details';
import { PropertyService } from '../../services/property-service';
import { ContactService } from '../../services/contact-service';

@Page({
    templateUrl: 'build/pages/favorite-list/favorite-list.html'
})
export class FavoriteListPage {

    static get parameters() {
        return [[NavController], [PropertyService], [ContactService]];
    }

    constructor(nav, propertyService, contactService) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.contactService = contactService;
    }

    ngOnInit() {
        this.loadFavorites();
    }

    loadFavorites() {
        this.propertyService.getFavorites(this.contactService.CurrentContact.id).subscribe(favorites => this.favorites = favorites);
    }

    itemTapped(event, favorite) {
        this.nav.push(PropertyDetailsPage, {
            property: favorite.property
        });
    }

    deleteItem(event, favorite) {
        this.propertyService.unfavorite(favorite).subscribe(() => this.loadFavorites());
    }

}
