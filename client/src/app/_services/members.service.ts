import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/Member';
import { PaginatedResults } from '../_model/Pagination';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  members: Member[] = [];
  baseUrl = environment.apiUrl;
  paginatedResults: PaginatedResults<Member[]> = new PaginatedResults<
    Member[]
  >();

  constructor(private http: HttpClient) {}

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http
      .get<Member[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          this.paginatedResults.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResults.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return this.paginatedResults;
        })
      );
  }

  getMember(username: string) {
    const member = this.members.find((user) => user.username === username);
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        return this.members[index];
      })
    );
  }

  updateMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
