import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headersUser: HttpHeaders;
  urlUser = 'https://conduit.productionready.io/api/user';
  urlProfiles = 'https://conduit.productionready.io/api/profiles/';
  constructor(private http: HttpClient) { }

  setTokenUser() {
    this.headersUser = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem("token")}`
    });
  }

  getUser() {
    this.setTokenUser();
    return this.http.get(this.urlUser, {
      headers: this.headersUser
    })
  }

  updateSetting(user) {
    this.setTokenUser();
    return this.http.put(this.urlUser, {
      user: user,
    }, {
      headers: this.headersUser
    })
  }

  getProfile(name) {
    if (localStorage.getItem('name')) {
      this.setTokenUser();
      return this.http.get(this.urlProfiles + `${name}`, {
        headers: this.headersUser
      });
    }
    return this.http.get(this.urlProfiles + `${name}`);
  }
}
