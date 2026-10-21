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
        <div class="plain">George Mason University · Fairfax, VA</div>
        <a href="mailto:bcui2@gmu.edu">Email</a>
        <a href="https://scholar.google.com/citations?user=Bxt28QQAAAAJ&hl=en">Google Scholar</a>
        <a href="https://github.com/bowencui123">GitHub</a>
        <a href="https://www.linkedin.com/in/bowen-cui-2a2a34233/">LinkedIn</a>
      </div>
    </div>
  </aside>
  <div class="home-main">
    <div class="eyebrow">Ph.D. Student · Computer Science</div>
    <h1>Bowen Cui</h1>
    <p class="home-lead">I research AI infrastructure, GPU kernel performance, and LLM-driven optimization of high-performance computing workloads.</p>
    <p class="home-bio">I am a Computer Science Ph.D. student at <a class="text-link" href="https://cs.gmu.edu/">George Mason University</a>, advised by Professor <a class="text-link" href="https://www.jokeren.tech/">Keren Zhou</a>. My research combines performance benchmarking, compiler and hardware analysis, and reliable code optimization across GPUs and HPC applications. I previously earned an <strong>M.A. in Statistics</strong> from Washington University in St. Louis and a B.S. in Applied Mathematics from Xi'an Jiaotong-Liverpool University.</p>

    <div class="section-row tight"><span class="eyebrow">Research Interests</span><span class="rule"></span></div>
    <div class="interest-grid">
      <div class="interest-card"><div class="t">GPU Kernels &amp; Accelerators</div><div class="d">Tile-based programming models, compiler lowering, profiling, and cross-architecture performance.</div></div>
      <div class="interest-card"><div class="t">LLMs for HPC Optimization</div><div class="d">Benchmarking, performance-guided optimization agents, correctness, and reproducible evaluation.</div></div>
      <div class="interest-card"><div class="t">AI Infrastructure</div><div class="d">Scalable benchmark infrastructure for real scientific applications, from GPU kernels to multi-GPU workloads.</div></div>
    </div>

    <div class="home-section">
      <div class="section-row"><span class="eyebrow">GitHub Activity</span><span class="rule"></span><span class="section-note" id="gh-total"></span></div>
      <div id="gh-activity" data-user="{{ site.author.github | default: 'bowencui123' }}"></div>
    </div>

    <div class="home-lower">
      <div>
        <div class="section-row"><span class="eyebrow">News</span><span class="rule"></span></div>
        <div class="news-list">{% for item in site.data.news %}<div class="news-item"><div class="news-date">{{ item.date }}</div><div class="news-text">{{ item.text }}</div></div>{% endfor %}</div>
      </div>
      <div>
        <div class="section-row"><span class="eyebrow">Selected Publications</span><span class="rule"></span></div>
        <div class="selpub-list">
          {% assign pubs = site.publications | where: 'featured', true | sort: 'date' | reverse %}
          {% for p in pubs limit: 3 %}
          <div class="selpub">
            {% if p.paperurl %}<a class="t selpub-t" href="{{ p.paperurl }}">{{ p.title }}</a>{% else %}<span class="t">{{ p.title }}</span>{% endif %}
            <div class="a">{{ p.authors }}</div>
            <div class="m"><span class="chip">{{ p.venue_short | default: p.venue }}</span><span class="y">{{ p.date | date: "%Y" }}</span></div>
          </div>
          {% endfor %}
          <a class="view-all" href="{{ '/publications/' | relative_url }}">View all publications →</a>
          <a class="view-all" href="{{ '/portfolio/' | relative_url }}">Explore research projects →</a>
        </div>
      </div>
    </div>
  </div>
</div>
