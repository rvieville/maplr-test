import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  public positions: Array<{ name: string; code: string }> = [
    { name: 'Defenseman', code: 'Defenseman' },
    { name: 'Center', code: 'Center' },
    { name: 'Right Wing', code: 'Right Wing' },
    { name: 'Left Wing', code: 'Left Wing' },
    { name: 'Goalie', code: 'Goalie' },
  ];

  public selectedYear: string = '';
  public playerForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private readonly fb: FormBuilder
  ) {
    this.playerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      number: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.selectedYear = this.config.data?.year;
  }

  public add(): void {
    if (this.playerForm.valid) {
      const player = this.playerForm.getRawValue();
      player.position = player.position.code;

      this.ref.close(player);
    }
  }
}
