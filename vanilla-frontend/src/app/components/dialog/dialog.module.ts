import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogComponent } from "./dialog.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [CommonModule, PipesModule, MatDialogModule],
  declarations: [DialogComponent],
  exports: [DialogComponent],
})
export class DialogModule {}
