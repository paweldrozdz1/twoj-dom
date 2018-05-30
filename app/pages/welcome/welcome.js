import { Page, NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../../services/contact-service';

@Page({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {

    static get parameters() {
        return [[NavController], [NavParams], [ContactService]];
    }

    constructor(nav, navParams, contactService) {
        this.nav = nav;
        this.contactService = contactService;
    }

    ngOnInit() {
    }
}