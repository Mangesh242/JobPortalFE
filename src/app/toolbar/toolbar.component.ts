import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SearchComponent } from './search/search.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    SearchComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  onLogout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { title: 'Confirm Logout', message: 'Are you sure you want to logout?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.sidenav.close();
        this.router.navigate(['/login']);
      }
    });
  }
  routeToPage(route: string) {
    this.router.navigate([route]);
    this.sidenav.close(); // Close the sidenav
  }
}