#!/usr/bin/env python

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

setup(
    name='simple-config-reader',
    version='0.0.5',
    url='https://github.com/anjianshi/simple-config-reader',
    license='MIT',
    author='anjianshi',
    author_email='anjianshi@gmail.com',
    description="一个简单的配置文件读取工具",
    packages=['simple_config_reader', "simple_config_reader.utils"],
    install_requires=['PyYAML'],
    zip_safe=False,
    platforms='any',
    keywords=['yaml', 'config'],
    classifiers=[
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
)
