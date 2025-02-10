/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link";

export default function ComponentsSocialLogin(props) {
  return (
    <>
      <div className="lumi-social-login">
        <Link href="/user/google-login" className="lumi-social-button">
          <img
            src="./images/Google.png"
            alt="google"
            className="lumi-google-icon"
          />
        </Link>
        <Link href="/line/google-login" className="lumi-social-button">
          <img src="./images/line.webp" alt="line" className="lumi-line-icon" />
        </Link>
      </div>
    </>
  );
}