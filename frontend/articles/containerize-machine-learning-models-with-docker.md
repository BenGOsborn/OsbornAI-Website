---
title: How to containerize machine learning models using Docker
description: This article demonstrates how you can containerize any machine learning or deep learning model using Docker.
author: OsbornAI
author_social: https://twitter.com/BenOsbornAI
date_published: 20/02/2021 
keywords: docker, containerizing, tensorflow, machine learning, how to containerize a machine learning model, how to, deployment, environment, deep learning, consistent
---

![Aerial View Photography of Container Van Lot](https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)

<br />

### Introduction:
Who would of thought that being able to bundle up your model into an environment that can be run on any computer without need for excess installations would be so useful? But surely that sounds way too good to be true, right? Wrong! Containerizing applications has become extremely popular within recent years, with no exception to the big data, machine learning and deep learning industry, which take advantage of this new technology to its fullest potential. 

<br />

In this article you're going to learn what is containerization and why you should use it, what Docker is, and be provided with an example of how you can containerize a TensorFlow and Flask REST API using Docker.

<br />

### What is containerization and why it is useful:
As stated earlier, containerization is essentially the process of bundling together a project and its environment into virtual runtime environments which can then be deployed wherever and will run exactly according to how the environment was set up. 

<br />

A container is essentially a miniature virtual server that contains all of the tools required to run your code. Ok, but why is that useful? Containers provide a simple way of sharing code with others without the need for them to set up their environment to run that code. This means that your code can now be run on almost any computer in the world that is able to run that container without the need for excess set up. 

<br />

Lets say that I'm working on a machine learning model for a client using Python 3.8 and TensorFlow 2.0. I finish the application, and I explain to my client that the application is finished and ready for them to deploy. You send them your code, and tell them to install Python 3.8 and TensorFlow 2.0, which they say they already have installed. Two hours later you get a phone call saying that their team has been encountering an error when trying to run your code. You spend the next four hours working with them, before finding out that they were actually using Python 3.6, which did not support some features that the intended version of Python 3.8 did. You've fixed the problem, but now this mistake has wasted both parties time, given you a large headache and worst of all has damaged your reputation. If only there was something you could of done to prevent this...

<br />

Now let's say you created a container that contained the code for the model with the correct versions and requirements of Python and TensorFlow already installed. You give the container to your client, they run it and it works first time without wasting your time, causing you frustration, and damaging your reputation!



