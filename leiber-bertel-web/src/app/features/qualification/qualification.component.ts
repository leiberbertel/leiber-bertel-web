import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface QualificationItem {
  title: string;
  subtitle: string;
  calendar: string;
  start: number;
  end: number | null;
}

interface PositionedQualificationItem extends QualificationItem {
  align: 'left' | 'right';
  last: boolean;
}

/**
 * Ordena de más reciente a más antiguo: primero por año de fin (lo que sigue
 * en curso va arriba) y, si empatan, por año de inicio más reciente. Luego
 * asigna la alternancia del timeline y marca el último elemento.
 */
function sortQualifications(items: QualificationItem[]): PositionedQualificationItem[] {
  return [...items]
    .sort(
      (a, b) =>
        (b.end ?? Infinity) - (a.end ?? Infinity) || b.start - a.start,
    )
    .map((item, i, arr) => ({
      ...item,
      align: i % 2 === 0 ? 'right' : 'left',
      last: i === arr.length - 1,
    }));
}

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="qualification section" id="qualification">
      <h2 class="section__title">{{ 'QUALIFICATION.TITLE' | translate }}</h2>
      <span class="section__subtitle">{{ 'QUALIFICATION.SUBTITLE' | translate }}</span>

      <div class="qualification__container container">
        <div class="qualification__tabs">
          <div class="qualification__button button--flex" [class.qualification__active]="activeTab === 'education'"
            (click)="setTab('education')">
            <i class="uil uil-graduation-cap qualification__icom"></i>
            {{ 'QUALIFICATION.TABS.EDUCATION' | translate }}
          </div>

          <div class="qualification__button button--flex" [class.qualification__active]="activeTab === 'work'"
            (click)="setTab('work')">
            <i class="uil uil-briefcase-alt qualification__icom"></i>
            {{ 'QUALIFICATION.TABS.WORK' | translate }}
          </div>
        </div>

        <div class="qualification__sections">
          <div class="qualification__content" [class.qualification__active]="activeTab === 'education'" data-content
            id="education" [style.display]="activeTab === 'education' ? 'block' : 'none'">
            <ng-container *ngFor="let item of education; index as i">
              <div class="qualification__data">
                <div class="qualification__info qualification__info--left"
                  [class.qualification__info--empty]="item.align === 'right'">
                  <ng-container *ngIf="item.align !== 'right'">
                    <h3 class="qualification__title">{{ item.title | translate }}</h3>
                    <span class="qualification__subtitle">{{ item.subtitle | translate }}</span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      {{ item.calendar | translate }}
                    </div>
                  </ng-container>
                </div>

                <div class="qualification__marker">
                  <span class="qualification__rounder"></span>
                  <span class="qualification__line" *ngIf="!item.last"></span>
                </div>

                <div class="qualification__info qualification__info--right"
                  [class.qualification__info--empty]="item.align !== 'right'">
                  <ng-container *ngIf="item.align === 'right'">
                    <h3 class="qualification__title">{{ item.title | translate }}</h3>
                    <span class="qualification__subtitle">{{ item.subtitle | translate }}</span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      {{ item.calendar | translate }}
                    </div>
                  </ng-container>
                </div>
              </div>
            </ng-container>
          </div>

          <div class="qualification__content" [class.qualification__active]="activeTab === 'work'" data-content id="work"
            [style.display]="activeTab === 'work' ? 'block' : 'none'">
            <ng-container *ngFor="let item of work; index as i">
              <div class="qualification__data">
                <div class="qualification__info qualification__info--left"
                  [class.qualification__info--empty]="item.align === 'right'">
                  <ng-container *ngIf="item.align !== 'right'">
                    <h3 class="qualification__title">{{ item.title | translate }}</h3>
                    <span class="qualification__subtitle">{{ item.subtitle | translate }}</span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      {{ item.calendar | translate }}
                    </div>
                  </ng-container>
                </div>

                <div class="qualification__marker">
                  <span class="qualification__rounder"></span>
                  <span class="qualification__line" *ngIf="!item.last"></span>
                </div>

                <div class="qualification__info qualification__info--right"
                  [class.qualification__info--empty]="item.align !== 'right'">
                  <ng-container *ngIf="item.align === 'right'">
                    <h3 class="qualification__title">{{ item.title | translate }}</h3>
                    <span class="qualification__subtitle">{{ item.subtitle | translate }}</span>
                    <div class="qualification__calendar">
                      <i class="uil uil-calendar-alt"></i>
                      {{ item.calendar | translate }}
                    </div>
                  </ng-container>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class QualificationComponent {
  education: PositionedQualificationItem[] = [];
  work: PositionedQualificationItem[] = [];

  @Input('education') set educationInput(items: QualificationItem[]) {
    this.education = sortQualifications(items ?? []);
  }

  @Input('work') set workInput(items: QualificationItem[]) {
    this.work = sortQualifications(items ?? []);
  }

  activeTab: 'education' | 'work' = 'education';

  setTab(tab: 'education' | 'work') {
    this.activeTab = tab;
  }
}
