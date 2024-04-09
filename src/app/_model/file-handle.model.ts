import { SafeUrl } from "@angular/platform-browser";
//interface to be used to preview files when selected
export interface FileHandle {
    file: File,
    url: SafeUrl
}