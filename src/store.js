import {action, observable} from 'mobx';

export class MyStore {
    @observable counter = 0;

    @action inc() {
        this.counter ++;
    }

    @action dec() {
        this.counter --;
    }
}
