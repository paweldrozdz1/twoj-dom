import { Page, NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../../services/contact-service';
import { WelcomePage } from '../welcome/welcome';

@Page({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

    static get parameters() {
        return [[NavController], [ContactService]];
    }

    constructor(nav, contactService) {
        this.nav = nav;
        this.loginForm = {};
        this.error;
        this.contactService = contactService;
    }

    logForm() {
        this.contactService.getContactByEmail(this.loginForm.email).subscribe(contact => {
            if (contact) {
                this.nav.setRoot(WelcomePage, {}, {
                    animate: true,
                    direction: 'forward'
                });
            } else {
                this.error = 'Username not found.';
            }
        });
    }

    emailChanged() {
        this.loginForm.password = '123456789';
    }

}