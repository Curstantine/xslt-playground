export const defaultInputXml = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="bk101">
    <author>Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
  </book>
  <book id="bk102">
    <author>Kim</author>
    <title>Learning XPath</title>
    <genre>Computer</genre>
    <price>39.95</price>
  </book>
</catalog>`;

export const defaultXslt = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Catalog</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 2rem; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 0.5rem 0.75rem; text-align: left; }
          th { background: #f4f4f5; }
        </style>
      </head>
      <body>
        <h1>Book Catalog</h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
          </tr>
          <xsl:for-each select="catalog/book">
            <tr>
              <td><xsl:value-of select="title"/></td>
              <td><xsl:value-of select="author"/></td>
              <td><xsl:value-of select="genre"/></td>
              <td>$<xsl:value-of select="price"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;
