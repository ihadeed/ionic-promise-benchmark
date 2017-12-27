import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Bluebird from 'bluebird';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  numOfPromises: number = 10000;

  constructor() {
    this.testAsync();
    // this.testNative();
    // this.testBluebird();
  }

  testBluebirdSeries() {
    console.time('Bluebird series');
    let i = 0;
    const then = () => {
      if (++i < this.numOfPromises) {
        return this.getBluebird().then(then.bind(this));
      } else {
        console.timeEnd('Bluebird series');
      }
    };

    this.getBluebird().then(then.bind(this));
  }

  async testAsyncSeries() {
    console.time('Async series');
    for (let i = 0; i < this.numOfPromises; i++) {
      await this.asyncFunc();
    }
    console.timeEnd('Async series');
  }

  testNativeSeries() {
    console.time('Bluebird series');
    let i = 0;
    const then = () => {
      if (++i < this.numOfPromises) {
        return this.getNative().then(then.bind(this));
      } else {
        console.timeEnd('Bluebird series');
      }
    };

    this.getNative().then(then.bind(this));
  }

  testBluebird() {
    console.time('Bluebird parallel');
    let p = [];
    for (let i = 0; i < this.numOfPromises; i++) {
      p.push(this.getBluebird());
    }
    Bluebird.all(p).then(() => {
      console.timeEnd('Bluebird parallel');
    });
  }

  testNative() {
    console.time('Native parallel');
    let p = [];
    for (let i = 0; i < this.numOfPromises; i++) {
      p.push(this.getNative());
    }
    Promise.all(p).then(() => {
      console.timeEnd('Native parallel');
    });
  }

  async testAsync() {
    console.time('Async parallel');
    let p = [];
    for (let i = 0; i < this.numOfPromises; i++) {
      p.push(this.asyncFunc());
    }
    await Promise.all(p);
    console.timeEnd('Async parallel')
  }

  getBluebird() {
    return new Bluebird(resolve => {
      resolve();
    });
  }

  getNative() {
    return new Promise(resolve => {
      resolve();
    });
  }

  async asyncFunc() {
    return true;
  }

}
