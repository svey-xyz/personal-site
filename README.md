# `soulelyhayden`

## `Table of Contents 📑`
- [Intro 🎬](#a-personal-website)
- [Tools 🧰](#what-tools-have-i-used-🧰)
- [Platforms 🌐](#what-platforms-did-i-choose-🌐)
- [Design 🖌️](#design-philosophy-🖌️)
- [Notes 📔](#notes-📔)
## `A personal website 🙌`
This project is where I develop [my personal site](https://haydensoule.com), as well as a location for me to test new and exciting web technologies.

This project has related repos- [CMS](https://github.com/soulelyhayden/personal-sanity-studio), and [serverless functions](https://github.com/soulelyhayden/personal-cloudflare-contact-worker). 

## What tools have I used? 🧰

#### [11ty // Eleventy](https://www.11ty.dev/)
Deciding what framework to use nowadays can pose a daunting first hurdle before you have even begone production on your project.

From the start of development of my site I knew that I wanted to develop something static and move away from the server side platforms (like Wordpress) that I had been using. When I came across 11ty I saw something that would let me have the freedom to develop my project, my way.

#### [Tailwindcss](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
Tailwindcss was actually a later addition to the project, as I had just gotten off of a project using **[SASS](https://sass-lang.com/)**, Tailwinds was a very unfamiliar environment. After having read about the benefits, and trolling through their documentation, I decided to give it a try; I mean this is my personal site anyway, no better place to learn a new tool.

After stumbling a little bit with relearning my styling syntax, I fell in love with Tailwindcss. The inline style saves loads of development time, and being able to pair it with other tools like PostCSS means you're not losing out on any functionality.

#### [Typescript](https://www.typescriptlang.org/)
Typescript was yet another new practice a learnt for this project, and one I hope to continue using in the future. Strongly typed Javascript has saved many headaches during the development process.

#### [Webpack](https://webpack.js.org/)
In order ot manage the scale this project had started to reach I opted to integrate a module bundler, and Webpack was the obvious choice.


## What platforms did I choose? 🌐
Choosing platforms wasn't as easy as it has been in the past. With a static project the options for fast 🏎️💨, reliable 🫶, secure 🔐, and affordable 💵 platforms are endless. After trying out a few, these are what I settled on-

#### [Sanity](https://www.sanity.io/)
Trusted by some of the largest corporations in the world, and with an incredibly flexible developer experience Sanity is hands down one of **THE BEST** CMSs I have had the pleasure to use.

If you're interested in the development for Sanity take a look at [the repo for this site](https://github.com/soulelyhayden/personal-sanity-studio).

#### [Cloudflare](https://www.cloudflare.com/)
I've been using Cloudflare to manage my DNS for ages, so when I saw their competitive offering for static hosting I knew I'd have to give it a try. With the success I had with their platform I also choose to host [my serverless functions](https://github.com/soulelyhayden/personal-cloudflare-contact-worker) on their **[Workers](https://workers.cloudflare.com/)** platform.


## Design Philosophy 🖌️

#### Visual Design
*This section to come later...*

#### Production Design
*This section to come later...*

## Notes 📔
Personal notes for development...

Required env variables, go in ```'config/config.env'```-
```
SANITYPROJECTID
SANITYDATASET
YOUTUBEAPIKEY
```