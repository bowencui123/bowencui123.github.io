---
layout: bc
permalink: /cv/
short_title: "CV"
redirect_from:
  - /resume
---
<div class="page-head"><div class="eyebrow">Curriculum Vitae</div><h1>CV</h1></div>
<p class="ph-note">A concise overview of my education, research and selected publications.</p>
<div class="cv-wrap">
  <div class="cv-section-row"><span class="eyebrow">Education</span><span class="rule" style="flex:1;height:1px;background:var(--border);"></span></div>
  {% for e in site.data.cv.education %}<div class="cv-row"><div><div class="t">{{ e.degree }}</div><div class="s">{{ e.school }}</div></div><div class="y">{{ e.years }}</div></div>{% endfor %}
  <div class="cv-section-row later"><span class="eyebrow">Research Experience</span><span class="rule" style="flex:1;height:1px;background:var(--border);"></span></div>
  {% for area in site.data.cv.research %}
    <h2 class="cv-research-heading">{{ area.title }}</h2>
    {% for pr in area.projects %}<div class="cv-row"><div><div class="t">{{ pr.name }}</div><div class="s">{{ pr.detail }}</div></div></div>{% endfor %}
  {% endfor %}
  <p class="cv-detail-link"><a class="text-link" href="{{ '/portfolio/' | relative_url }}">See research project descriptions →</a></p>
  <div class="cv-section-row later"><span class="eyebrow">Selected Publications</span><span class="rule" style="flex:1;height:1px;background:var(--border);"></span></div>
  {% assign pubs = site.publications | sort: 'date' | reverse %}
  {% for p in pubs %}<div class="cv-row"><div><div class="t">{{ p.title }}</div><div class="s">{{ p.authors }} · {{ p.venue }}</div></div><div class="y">{{ p.date | date: "%Y" }}</div></div>{% endfor %}
  <div class="cv-section-row skills"><span class="eyebrow">Skills</span><span class="rule" style="flex:1;height:1px;background:var(--border);"></span></div>
  <div class="skill-chips">{% for s in site.data.cv.skills %}<span class="skill-chip">{{ s }}</span>{% endfor %}</div>
</div>
