<?xml version="1.0" encoding="UTF-8"?>
<!-- Presentación legible del sitemap en el navegador. Los buscadores ignoran esta hoja y leen el XML tal cual. -->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	exclude-result-prefixes="sm xhtml">
	<xsl:output method="html" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/">
		<html lang="en">
			<head>
				<meta charset="utf-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<meta name="robots" content="noindex"/>
				<title>Sitemap · benatgaldos.net</title>
				<style>
					:root { --bg:#303F9F; --fg:#FAFAFA; --card:rgba(255,255,255,.08); --line:rgba(255,255,255,.25); }
					* { box-sizing: border-box; }
					body { margin:0; background:var(--bg); color:var(--fg); font-family: Roboto, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; font-weight:300; line-height:1.5; }
					main { max-width: 56rem; margin: 0 auto; padding: 3rem 24px; }
					h1 { font-size: 2rem; font-weight: 600; margin: 0 0 .5rem; }
					p.intro { margin: 0 0 2rem; opacity: .85; }
					a { color:#fff; }
					table { width:100%; border-collapse: collapse; background: var(--card); border-radius: 12px; overflow: hidden; }
					th, td { text-align:left; padding: .85rem 1rem; vertical-align: top; }
					th { font-weight:600; font-size:.8rem; text-transform: uppercase; letter-spacing:.06em; border-bottom:1px solid var(--line); }
					td { border-bottom: 1px solid var(--line); }
					tr:last-child td { border-bottom: 0; }
					td.date { white-space: nowrap; opacity:.85; }
					.lang { display:inline-block; margin: .15rem .4rem .15rem 0; padding: .1rem .6rem; border:1px solid currentColor; border-radius:999px; font-size:.8rem; text-decoration:none; }
					.lang:hover { background:#FAFAFA; color:#303F9F; }
					footer { margin-top: 2rem; font-size:.85rem; opacity:.75; }
					@media (max-width: 600px) { th.alt, td.alt { display:none; } }
				</style>
			</head>
			<body>
				<main>
					<h1>Sitemap</h1>
					<p class="intro">
						<xsl:value-of select="count(sm:urlset/sm:url)"/> pages on
						<a href="https://benatgaldos.net/">benatgaldos.net</a>.
						This is the file search engines read to discover the site.
					</p>
					<table>
						<thead>
							<tr>
								<th>URL</th>
								<th class="alt">Languages</th>
								<th>Last modified</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="sm:urlset/sm:url">
								<tr>
									<td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
									<td class="alt">
										<xsl:for-each select="xhtml:link[@rel='alternate' and @hreflang!='x-default']">
											<a class="lang" href="{@href}"><xsl:value-of select="@hreflang"/></a>
										</xsl:for-each>
									</td>
									<td class="date"><xsl:value-of select="sm:lastmod"/></td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
					<footer>See also <a href="/llms.txt">llms.txt</a> and <a href="/robots.txt">robots.txt</a>.</footer>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
