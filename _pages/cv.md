---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* **Ph.D. in Computer Science**, George Mason University, 2024 — Present
  * Advisor: Professor [Keren Zhou](https://www.jokeren.tech/)
* **M.S. in Statistics**, Washington University in St. Louis
* **B.S. in Applied Mathematics**, Xi'an Jiaotong-Liverpool University

Research Interests
======
* High-Performance Computing
* Code Optimization
* Large Language Models for code performance

Experience
======
* **Graduate Research Assistant**, George Mason University, 2024 — Present
  * Research on evaluating and improving LLMs for HPC code performance optimization

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
