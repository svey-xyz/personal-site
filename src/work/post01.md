---
layout: layouts/project.njk

title: post01
tags: [test, web_dev]
blurb: "A test project to test different things on."
# src: './src/content/' + title + '/'

images: ['2-Another.png']
thumb: ['thumb.png']
---

## {{ title }}
**This is my first project post! Woohoo**

{% image images[0], title, 'test' %}