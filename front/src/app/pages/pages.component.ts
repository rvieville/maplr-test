import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Player } from '../models/player.mdoel';
import { Select } from '../models/select.model';
import { PlayersService } from '../services/players.service';
import { AddPlayerComponent } from './modal/add-player/add-player.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public players!: Array<any>;
  public columns: Array<any>;
  public coach!: string;

  public years: Array<Select> = [
    { name: '2010', code: '2010' },
    { name: '2011', code: '2011' },
    { name: '2012', code: '2012' },
    { name: '2013', code: '2013' },
    { name: '2014', code: '2013' },
    { name: '2015', code: '2014' },
    { name: '2016', code: '2015' },
    { name: '2017', code: '2016' },
    { name: '2018', code: '2017' },
    { name: '2019', code: '2018' },
    { name: '2020', code: '2019' },
    { name: '2021', code: '2021' },
    { name: '2022', code: '2022' },
  ];

  public selectedYear: Select;

  constructor(
    private readonly playerService: PlayersService,
    public dialogService: DialogService
  ) {
    this.columns = [
      { field: 'name', header: 'Name' },
      { field: 'lastname', header: 'Last name' },
      { field: 'position', header: 'Position' },
      { field: 'number', header: 'Number' },
      { field: 'isCaptain', header: 'Captain' },
      { field: null, header: null },
    ];

    this.selectedYear = this.years[0];
  }

  ngOnInit(): void {
    this.getTeam(this.selectedYear);
  }

  public getTeam(year: Select): void {
    this.playerService.get(year.code).subscribe((data) => {
      this.players = data.players;
      this.coach = data.coach;
    });
  }

  public openModal(): void {
    const dialRef = this.dialogService.open(AddPlayerComponent, {
      width: '40%',
      contentStyle: { height: '500px', overflow: 'auto' },
      data: {
        year: this.selectedYear?.name,
      },
    });

    dialRef.onClose.subscribe((data) => {
      if (data) {
        this.playerService
          .create(this.selectedYear!.code, data)
          .subscribe((res) => {
            this.players.push(res);
          });
      }
    });
  }

  public setAsCaptain(player: Player): void {
    this.playerService.setAsCaptain(player.id).subscribe((data) => {
      this.ngOnInit();
    });
  }
}
