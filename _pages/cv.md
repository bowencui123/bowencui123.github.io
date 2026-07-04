---
layout: bc
permalink: /cv/
short_title: "CV"
redirect_from:
  - /resume
---

<div class="page-head page-head--split">
  <div>
    <div class="eyebrow">Curriculum Vitae</div>
    <h1>CV</h1>
  </div>
  <button id="print-cv" class="btn-primary no-print">Download / Print PDF</button>
</div>

<div class="cv-wrap">

  <div class="cv-section-row">
    <span class="eyebrow">Education</span>
    <span class="rule" style="flex:1;height:1px;background:var(--border);"></span>
  </div>
  {% for e in site.data.cv.education %}
  <div class="cv-row">
    <div>
      <div class="t">{{ e.degree }}</div>
      <div class="s">{{ e.school }}</div>
    </div>
    <div class="y">{{ e.years }}</div>
  </div>
  {% endfor %}

  <div class="cv-section-row later">
    <span class="eyebrow">Experience</span>
    <span class="rule" style="flex:1;height:1px;background:var(--border);"></span>
  </div>
  {% for e in site.data.cv.experience %}
  <div class="cv-row">
    <div>
      <div class="t">{{ e.role }}</div>
      <div class="s">{{ e.org }}</div>
    </div>
    <div class="y">{{ e.years }}</div>
  </div>
  {% endfor %}

  <div class="cv-section-row later">
    <span class="eyebrow">Publications</span>
    <span class="rule" style="flex:1;height:1px;background:var(--border);"></span>
  </div>
  {% assign pubs = site.publications | sort: 'date' | reverse %}
  {% for p in pubs %}
  <div class="cv-row">
    <div>
      <div class="t">{{ p.title }}</div>
      <div class="s">{{ p.authors }} · {{ p.venue }}</div>
    </div>
    <div class="y">{{ p.date | date: "%Y" }}</div>
  </div>
  {% endfor %}

  <div class="cv-section-row skills">
    <span class="eyebrow">Skills</span>
    <span class="rule" style="flex:1;height:1px;background:var(--border);"></span>
  </div>
  <div class="skill-chips">
    {% for s in site.data.cv.skills %}<span class="skill-chip">{{ s }}</span>{% endfor %}
  </div>

</div>
