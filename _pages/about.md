---
layout: bc
permalink: /
short_title: "About"
redirect_from:
  - /about/
  - /about.html
---

<div class="home-grid">

  <aside class="home-aside">
    <img class="portrait" src="{{ '/images/portrait.jpg' | relative_url }}" alt="Portrait of Bowen Cui">
    <div>
      <div class="contact-label">Contact</div>
      <div class="contact-list">
        <div class="plain">Fairfax, VA, USA</div>
        <div class="plain">George Mason University</div>
        <a href="mailto:bcui2@gmu.edu">Email</a>
        <a href="https://scholar.google.com/citations?user=Bxt28QQAAAAJ&hl=en">Google Scholar</a>
        <a href="https://github.com/bowencui123">GitHub</a>
      </div>
    </div>
  </aside>

  <div class="home-main">
    <div class="eyebrow">Ph.D. Student · Computer Science</div>
    <h1>Bowen Cui</h1>
    <p class="home-lead">I work on making high-performance software faster to run and easier to understand.</p>
    <p class="home-bio">I am a first-year (Fall 2024) Ph.D. student in the <a class="text-link" href="https://cs.gmu.edu/">Department of Computer Science</a> at <a class="text-link" href="https://www.gmu.edu/">George Mason University</a> (GMU), advised by Professor <a class="text-link" href="https://www.jokeren.tech/">Keren Zhou</a>. Before GMU, I received my M.S. in Statistics from Washington University in St.&nbsp;Louis (WUSTL) and my B.S. in Applied Mathematics from Xi'an Jiaotong-Liverpool University (XJTLU).</p>

    <div class="section-row tight">
      <span class="eyebrow">Research Interests</span>
      <span class="rule"></span>
    </div>
    <div class="interest-grid">
      <div class="interest-card">
        <div class="t">High-Performance Computing</div>
        <div class="d">Performance analysis and profiling of large-scale applications on modern GPU and CPU architectures.</div>
      </div>
      <div class="interest-card">
        <div class="t">Code Optimization</div>
        <div class="d">Compiler- and profiling-guided techniques for finding and eliminating performance bottlenecks.</div>
      </div>
      <div class="interest-card">
        <div class="t">Large Language Models</div>
        <div class="d">Applying LLMs to systems problems — kernel generation, code translation, and performance tuning.</div>
      </div>
    </div>

    <div class="home-section">
      <div class="section-row">
        <span class="eyebrow">GitHub Activity</span>
        <span class="rule"></span>
        <span class="section-note" id="gh-total"></span>
      </div>
      <div id="gh-activity" data-user="{{ site.author.github | default: 'bowencui123' }}"></div>
    </div>

    <div class="home-lower">

      <div>
        <div class="section-row">
          <span class="eyebrow">News</span>
          <span class="rule"></span>
        </div>
        <div class="news-list">
          {% for item in site.data.news %}
          <div class="news-item">
            <div class="news-date">{{ item.date }}</div>
            <div class="news-text">{{ item.text }}</div>
          </div>
          {% endfor %}
        </div>
      </div>

      <div>
        <div class="section-row">
          <span class="eyebrow">Selected Publications</span>
          <span class="rule"></span>
        </div>
        <div class="selpub-list">
          {% assign pubs = site.publications | sort: 'date' | reverse %}
          {% for p in pubs limit: 3 %}
          <div class="selpub">
            {% if p.paperurl %}
            <a class="t selpub-t" href="{{ p.paperurl }}">{{ p.title }}</a>
            {% else %}
            <span class="t">{{ p.title }}</span>
            {% endif %}
            <div class="a">{{ p.authors }}</div>
            <div class="m">
              <span class="chip">{{ p.venue_short | default: p.venue }}</span>
              <span class="y">{{ p.date | date: "%Y" }}</span>
            </div>
          </div>
          {% endfor %}
          <a class="view-all" href="{{ '/publications/' | relative_url }}">View all publications →</a>
        </div>
      </div>

    </div>
  </div>
</div>
