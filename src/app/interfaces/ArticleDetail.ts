import { SafeHtml } from "@angular/platform-browser"

export interface ArticleDetail {
   id: number,
   title: string,
   subtitle: string,
   mainimg: string,
   preview: string,
   safeHTML: SafeHtml | undefined ,
   content: string,
   slug: string,
   date: Date,
   type: string
}