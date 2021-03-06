function printReference(title, html) {
  html =
    typeof html === 'string'
      ? html
      : html.outerHTML || new XMLSerializer().serializeToString(html)
  let stylesHtml = ''
  for (const node of [
    ...document.querySelectorAll('link[rel="stylesheet"], style'),
  ]) {
    stylesHtml += node.outerHTML
  }
  const WinPrint = window.open(
    '',
    '',
    'left=0,top=0,width=1200,height=800,toolbar=0,scrollbars=0,status=0',
  )

  WinPrint.document.write(`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${stylesHtml}
        <style type="text/css" medial="print">
          @page {size: portrait;}
        </style>
      </head>
      <body>
        <div class="v-application v-application--is-ltr theme--light">
          <div class="v-application--wrap">
            ${html}
          </div>
        </div>      
      </body>
    </html>
  `)

  WinPrint.focus()
  setTimeout(function () {
    WinPrint.print()
  }, 2000)
}

export default {
  printReference,
}
