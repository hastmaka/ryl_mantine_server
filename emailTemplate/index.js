const {formatDate} = require("../helper/FormatDate");
const {capitalize} = require("../helper/capitalize");
const fixValue = (key, value) => {
    if (['datePickUp', 'datePickUpReturn'].includes(key)) {
        return formatDate(value);
    } else if (key === 'phone') {
        return value.toString();
    } else {
        return value;
    }
}

const generateHtml = (data, isReturn = false, serviceName) => {
    return `
        <table cellspacing="20" cellpadding="0" border="0" align="left" style="margin-top: 1rem;width: 100%;">
            <tbody>
            ${isReturn ? `<td style="padding: .5rem" colspan="2">
                <span style="font-weight: 100;color: #727272">Round Trip -----------------------------------------------------------------</span>
            </td>` : ''}
            ${serviceName ? `<tr style="text-align: left;width: 100%;">
                <td style="padding: .5rem">
                    Service:
                </td>
                <td style="padding: .5rem">
                    ${serviceName}
                </td>
            </tr>` : ''}
            ${Object.entries(data).filter(([, value]) => !['', null, undefined].includes(value)).map(([key, value]) =>`
                <tr style="text-align: left;width: 100%;">
                    <td style="padding: .5rem;width: 50% ">
                        <span style="font-weight: 400;">${capitalize(key)}:</span>
                    </td>
                    <td style="padding: .5rem;">
                        <span style="font-weight: 400;">${key !== 'email' ? capitalize(fixValue(key, value)) : value}</span>
                    </td>
                </tr>
            `).join('')}
            </tbody>
        </table>
    `
}

const serviceHtml = (data) => {
    let {formData, staticData} = data,
        {datePickUpReturn, howManyReturn, pickUpLocationReturn, ...rest} = formData,
        returnData = {pickUpLocationReturn, howManyReturn, datePickUpReturn};
    return `
        <table cellspacing="20" cellpadding="0" border="0" align="left" style="margin-top: 2rem;width: 100%;">
            <tbody>
                ${generateHtml(rest, false, staticData.serviceName)}                    
                ${staticData.roundTrip ? generateHtml(returnData, staticData.roundTrip, null) : ''}
            </tbody>
        </table>
    `
}

const paymentReceipt = (data) => {
    let {formData, staticData} = data,
        {datePickUpReturn, howManyReturn, pickUpLocationReturn, ...rest} = formData,
        returnData = {pickUpLocationReturn, howManyReturn, datePickUpReturn};
    // debugger
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title></title>
        </head>
        
        <body>
            <div dir="ltr" class="es-wrapper-color">
             <style type="">
             /* CONFIG STYLES Please do not delete and edit CSS styles below */
        /* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
        #outlook a {
            padding: 0;
        }
        
        .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
        }
        
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
        }
        
        /*
        END OF IMPORTANT
        */
        body {
            width: 100%;
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        table {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
        }
        
        table td,
        body,
        .es-wrapper {
            padding: 0;
            Margin: 0;
        }
        
        .es-content,
        .es-header,
        .es-footer {
            table-layout: fixed !important;
            width: 100%;
        }
        
        img {
            display: block;
            border: 0;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        
        p,
        hr {
            Margin: 0;
        }
        
        h1,
        h2,
        h3,
        h4,
        h5 {
            Margin: 0;
            line-height: 120%;
            mso-line-height-rule: exactly;
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
        }
        
        p,
        ul li,
        ol li,
        a {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
            mso-line-height-rule: exactly;
        }
        
        .es-left {
            float: left;
        }
        
        .es-right {
            float: right;
        }
        
        .es-p5 {
            padding: 5px;
        }
        
        .es-p5t {
            padding-top: 5px;
        }
        
        .es-p5b {
            padding-bottom: 5px;
        }
        
        .es-p5l {
            padding-left: 5px;
        }
        
        .es-p5r {
            padding-right: 5px;
        }
        
        .es-p10 {
            padding: 10px;
        }
        
        .es-p10t {
            padding-top: 10px;
        }
        
        .es-p10b {
            padding-bottom: 10px;
        }
        
        .es-p10l {
            padding-left: 10px;
        }
        
        .es-p10r {
            padding-right: 10px;
        }
        
        .es-p15 {
            padding: 15px;
        }
        
        .es-p15t {
            padding-top: 15px;
        }
        
        .es-p15b {
            padding-bottom: 15px;
        }
        
        .es-p15l {
            padding-left: 15px;
        }
        
        .es-p15r {
            padding-right: 15px;
        }
        
        .es-p20 {
            padding: 20px;
        }
        
        .es-p20t {
            padding-top: 20px;
        }
        
        .es-p20b {
            padding-bottom: 20px;
        }
        
        .es-p20l {
            padding-left: 20px;
        }
        
        .es-p20r {
            padding-right: 20px;
        }
        
        .es-p25 {
            padding: 25px;
        }
        
        .es-p25t {
            padding-top: 25px;
        }
        
        .es-p25b {
            padding-bottom: 25px;
        }
        
        .es-p25l {
            padding-left: 25px;
        }
        
        .es-p25r {
            padding-right: 25px;
        }
        
        .es-p30 {
            padding: 30px;
        }
        
        .es-p30t {
            padding-top: 30px;
        }
        
        .es-p30b {
            padding-bottom: 30px;
        }
        
        .es-p30l {
            padding-left: 30px;
        }
        
        .es-p30r {
            padding-right: 30px;
        }
        
        .es-p35 {
            padding: 35px;
        }
        
        .es-p35t {
            padding-top: 35px;
        }
        
        .es-p35b {
            padding-bottom: 35px;
        }
        
        .es-p35l {
            padding-left: 35px;
        }
        
        .es-p35r {
            padding-right: 35px;
        }
        
        .es-p40 {
            padding: 40px;
        }
        
        .es-p40t {
            padding-top: 40px;
        }
        
        .es-p40b {
            padding-bottom: 40px;
        }
        
        .es-p40l {
            padding-left: 40px;
        }
        
        .es-p40r {
            padding-right: 40px;
        }
        
        .es-menu td {
            border: 0;
        }
        
        .es-menu td a img {
            display: inline-block !important;
            vertical-align: middle;
        }
        
        /*
        END CONFIG STYLES
        */
        s {
            text-decoration: line-through;
        }
        
        p,
        ul li,
        ol li {
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
            line-height: 150%;
        }
        
        ul li,
        ol li {
            Margin-bottom: 15px;
            margin-left: 0;
        }
        
        a {
            text-decoration: underline;
        }
        
        .es-menu td a {
            text-decoration: none;
            display: block;
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
        }
        
        .es-wrapper {
            width: 100%;
            height: 100%;
            background-repeat: repeat;
            background-position: center top;
        }
        
        .es-wrapper-color,
        .es-wrapper {
            background-color: #fafafa;
        }
        
        .es-header {
            background-color: transparent;
            background-repeat: repeat;
            background-position: center top;
        }
        
        .es-header-body {
            background-color: transparent;
        }
        
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li {
            color: #333333;
            font-size: 14px;
        }
        
        .es-header-body a {
            color: #666666;
            font-size: 14px;
        }
        
        .es-content-body {
            background-color: #ffffff;
        }
        
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li {
            color: #333333;
            font-size: 14px;
        }
        
        .es-content-body a {
            color: #5c68e2;
            font-size: 14px;
        }
        
        .es-footer {
            background-color: transparent;
            background-repeat: repeat;
            background-position: center top;
        }
        
        .es-footer-body {
            background-color: transparent;
        }
        
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li {
            color: #333333;
            font-size: 12px;
        }
        
        .es-footer-body a {
            color: #333333;
            font-size: 12px;
        }
        
        .es-infoblock,
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li {
            line-height: 120%;
            font-size: 12px;
            color: #cccccc;
        }
        
        .es-infoblock a {
            font-size: 12px;
            color: #cccccc;
        }
        
        h1 {
            font-size: 46px;
            font-style: normal;
            font-weight: bold;
            color: #333333;
        }
        
        h2 {
            font-size: 26px;
            font-style: normal;
            font-weight: bold;
            color: #333333;
        }
        
        h3 {
            font-size: 20px;
            font-style: normal;
            font-weight: bold;
            color: #333333;
        }
        
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
            font-size: 46px;
        }
        
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
            font-size: 26px;
        }
        
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
            font-size: 20px;
        }
        
        a.es-button,
        button.es-button {
            padding: 10px 30px 10px 30px;
            display: inline-block;
            background: #5c68e2;
            border-radius: 5px;
            font-size: 20px;
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
            font-weight: normal;
            font-style: normal;
            line-height: 120%;
            color: #ffffff;
            text-decoration: none;
            width: auto;
            text-align: center;
            mso-padding-alt: 0;
            mso-border-alt: 10px solid #5c68e2;
        }
        
        .es-button-border {
            border-style: solid solid solid solid;
            border-color: #2cb543 #2cb543 #2cb543 #2cb543;
            background: #5c68e2;
            border-width: 0px 0px 0px 0px;
            display: inline-block;
            border-radius: 5px;
            width: auto;
        }
        
        /* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
        @media only screen and (max-width: 600px) {
        
            p,
            ul li,
            ol li,
            a {
                line-height: 150% !important;
            }
        
            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
                line-height: 120% !important;
            }
        
            h1 {
                font-size: 32px !important;
                text-align: left;
            }
        
            h2 {
                font-size: 26px !important;
                text-align: left;
            }
        
            h3 {
                font-size: 20px !important;
                text-align: left;
            }
        
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
                font-size: 32px !important;
                text-align: left;
            }
        
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
                font-size: 26px !important;
                text-align: left;
            }
        
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
                font-size: 20px !important;
                text-align: left;
            }
        
            .es-menu td a {
                font-size: 12px !important;
            }
        
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
                font-size: 14px !important;
            }
        
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
                font-size: 14px !important;
            }
        
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
                font-size: 14px !important;
            }
        
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
                font-size: 12px !important;
            }
        
            *[class="gmail-fix"] {
                display: none !important;
            }
        
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
                text-align: center !important;
            }
        
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
                text-align: right !important;
            }
        
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
                text-align: left !important;
            }
        
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
                display: inline !important;
            }
        
            .es-button-border {
                display: inline-block !important;
            }
        
            a.es-button,
            button.es-button {
                font-size: 20px !important;
                display: inline-block !important;
            }
        
            .es-adaptive table,
            .es-left,
            .es-right {
                width: 100% !important;
            }
        
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
                width: 100% !important;
                max-width: 600px !important;
            }
        
            .es-adapt-td {
                display: block !important;
                width: 100% !important;
            }
        
            .adapt-img {
                width: 100% !important;
                height: auto !important;
            }
        
            .es-m-p0 {
                padding: 0 !important;
            }
        
            .es-m-p0r {
                padding-right: 0 !important;
            }
        
            .es-m-p0l {
                padding-left: 0 !important;
            }
        
            .es-m-p0t {
                padding-top: 0 !important;
            }
        
            .es-m-p0b {
                padding-bottom: 0 !important;
            }
        
            .es-m-p20b {
                padding-bottom: 20px !important;
            }
        
            .es-mobile-hidden,
            .es-hidden {
                display: none !important;
            }
        
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
                width: auto !important;
                overflow: visible !important;
                float: none !important;
                max-height: inherit !important;
                line-height: inherit !important;
            }
        
            tr.es-desk-hidden {
                display: table-row !important;
            }
        
            table.es-desk-hidden {
                display: table !important;
            }
        
            td.es-desk-menu-hidden {
                display: table-cell !important;
            }
        
            .es-menu td {
                width: 1% !important;
            }
        
            .es-menu-cgjqzxzn .es-adapt-td {
                padding-left: 0 !important;
                padding-right: 0 !important;
                width: 100% !important;
            }
        
            .es-menu-cgjqzxzn td {
                border: 0 !important;
            }
        
            .es-menu-cgjqzxzn td:not(:last-child) {
                border-bottom: 1px solid #cccccc !important;
            }
        
            table.es-table-not-adapt,
            .esd-block-html table {
                width: auto !important;
            }
        
            table.es-social {
                display: inline-block !important;
            }
        
            table.es-social td {
                display: inline-block !important;
            }
        
            .es-m-p5 {
                padding: 5px !important;
            }
        
            .es-m-p5t {
                padding-top: 5px !important;
            }
        
            .es-m-p5b {
                padding-bottom: 5px !important;
            }
        
            .es-m-p5r {
                padding-right: 5px !important;
            }
        
            .es-m-p5l {
                padding-left: 5px !important;
            }
        
            .es-m-p10 {
                padding: 10px !important;
            }
        
            .es-m-p10t {
                padding-top: 10px !important;
            }
        
            .es-m-p10b {
                padding-bottom: 10px !important;
            }
        
            .es-m-p10r {
                padding-right: 10px !important;
            }
        
            .es-m-p10l {
                padding-left: 10px !important;
            }
        
            .es-m-p15 {
                padding: 15px !important;
            }
        
            .es-m-p15t {
                padding-top: 15px !important;
            }
        
            .es-m-p15b {
                padding-bottom: 15px !important;
            }
        
            .es-m-p15r {
                padding-right: 15px !important;
            }
        
            .es-m-p15l {
                padding-left: 15px !important;
            }
        
            .es-m-p20 {
                padding: 20px !important;
            }
        
            .es-m-p20t {
                padding-top: 20px !important;
            }
        
            .es-m-p20r {
                padding-right: 20px !important;
            }
        
            .es-m-p20l {
                padding-left: 20px !important;
            }
        
            .es-m-p25 {
                padding: 25px !important;
            }
        
            .es-m-p25t {
                padding-top: 25px !important;
            }
        
            .es-m-p25b {
                padding-bottom: 25px !important;
            }
        
            .es-m-p25r {
                padding-right: 25px !important;
            }
        
            .es-m-p25l {
                padding-left: 25px !important;
            }
        
            .es-m-p30 {
                padding: 30px !important;
            }
        
            .es-m-p30t {
                padding-top: 30px !important;
            }
        
            .es-m-p30b {
                padding-bottom: 30px !important;
            }
        
            .es-m-p30r {
                padding-right: 30px !important;
            }
        
            .es-m-p30l {
                padding-left: 30px !important;
            }
        
            .es-m-p35 {
                padding: 35px !important;
            }
        
            .es-m-p35t {
                padding-top: 35px !important;
            }
        
            .es-m-p35b {
                padding-bottom: 35px !important;
            }
        
            .es-m-p35r {
                padding-right: 35px !important;
            }
        
            .es-m-p35l {
                padding-left: 35px !important;
            }
        
            .es-m-p40 {
                padding: 40px !important;
            }
        
            .es-m-p40t {
                padding-top: 40px !important;
            }
        
            .es-m-p40b {
                padding-bottom: 40px !important;
            }
        
            .es-m-p40r {
                padding-right: 40px !important;
            }
        
            .es-m-p40l {
                padding-left: 40px !important;
            }
        
            button.es-button {
                width: 100%;
            }
        
            .es-desk-hidden {
                display: table-row !important;
                width: auto !important;
                overflow: visible !important;
                max-height: inherit !important;
            }
        
            .h-auto {
                height: auto !important;
            }
        }
        
        /* END RESPONSIVE STYLES */
        input,
        textarea {
            box-sizing: border-box;
            resize: vertical;
            -webkit-appearance: none;
        }
        
        form button {
            cursor: pointer;
            border: 0;
        }
        
        .es-p-default {
            padding-top: 0px;
            padding-right: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
        }
        
        .es-p-all-default {
            padding: 0px;
        }
        </style>
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="esd-email-paddings" valign="top">
                                <table cellpadding="0" cellspacing="0" class="es-header esd-header-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p10t es-p10b es-p20r es-p20l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image es-p20b" style="font-size: 0px;"><a target="_blank"><img src="https://fonjnlj.stripocdn.email/content/guids/CABINET_aca1c5a0bf1f0acdde6372761a9026731c463cba32acb251a240e1a078df768a/images/black_type_icon.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo"></a></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20t es-p0b es-p20r es-p20l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p5b es-m-txt-c">
                                                                                                <p style="color: #696969;"><strong>Reservation ID: ${staticData.reservationId}</strong></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-m-txt-c">
                                                                                                <h1 style="text-align: center; font-size: 28px; color: #008000;">Your Reservation have been Confirmed!.</h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-structure es-p20t es-p20r es-p20l es-m-p5r es-m-p5l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                                                                                <table border="0" width="70%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="border-bottom: 1px solid #cccccc; background: unset; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="left" class="esd-block-text">
                                                                                                <p style="color: #696969;">Hi ${capitalize(formData.name)},</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="left" class="esd-block-text es-p15t">
                                                                                                <p style="color: #696969;">I hope this message finds you well. I’m pleased to confirm that your payment of <span style="font-size:16px;"><strong>$${staticData.totalCharge / 100}</strong></span> for the limousine service has been successfully processed. Everything is in order, and we are all set for your upcoming reservation.</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-spacer es-p10" style="font-size:0">
                                                                                                <table border="0" width="70%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="border-bottom: 1px solid #cccccc; background: unset; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure" align="left" style="border-radius: 10px;">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 15px; border-collapse: separate;">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p20" bgcolor="#ffffff">
                                                                                                <p style="color: #666666; line-height: 200%; font-size: 16px;">Confirmed Time:</p>
                                                                                                <p style="color: #666666; line-height: 200%; font-size: 16px;">${formatDate(formData.datePickUp)}</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="640" style="background-color: transparent;">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20r es-p20l es-m-p5r es-m-p5l" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="left">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p15t es-p15b es-p20l es-m-p10t es-m-p10b es-m-p5l" bgcolor="#ffffff">
                                                                                                    ${generateHtml(rest, false, staticData.serviceName)}                    
                                                                                                    ${staticData.roundTrip ? generateHtml(returnData, staticData.roundTrip, null) : ''}
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-spacer es-p20" style="font-size:0" bgcolor="#ffffff">
                                                                                                <table border="0" width="70%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="border-bottom: 1px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-structure es-p20r es-p20l es-m-p0" align="center">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-social es-p10t es-p10b" style="font-size: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                                                                                                <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center" valign="top" class="es-p10r"><a target="_blank" href="https://www.facebook.com/jaylimovegas"><img title="Facebook" src="https://fonjnlj.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32"></a></td>
                                                                                                            <td align="center" valign="top"><a target="_blank" href="https://instagram.com/jaylimovegas"><img title="Instagram" src="https://fonjnlj.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32"></a></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text es-p15t es-p15b" bgcolor="#ffffff">
                                                                                                <p style="color: #666666;">JAY LIMO LLC</p>
                                                                                                <p style="color: #666666;">7716 Allerton Ave, Las Vegas, NV 89128.</p>
                                                                                                <p style="color: #666666;">(702)-285-2254</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="esd-block-menu" esd-tmp-menu-padding="10|10" esd-tmp-divider="1|solid|#cccccc" esd-tmp-menu-color="#999999">
                                                                                                <table cellpadding="0" cellspacing="0" width="100%" class="es-menu es-menu-cgjqzxzn">
                                                                                                    <tbody>
                                                                                                        <tr class="links">
                                                                                                            <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l es-adapt-td" style="padding: 10px 5px;" bgcolor="#ffffff"><a target="_blank" href="https://jaylimovegas.com/term-of-service" style="color: #999999;white-space: nowrap">Term of Service</a></td>
                                                                                                            <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l es-adapt-td" style="padding: 10px 5px; border-left: 1px solid #cccccc;" bgcolor="#ffffff"><a target="_blank" href="https://jaylimovegas.com/privacy-policy" style="color: #999999;white-space: nowrap">Privacy Policy</a></td>
                                                                                                            <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l es-adapt-td" style="padding: 10px 5px; border-left: 1px solid #cccccc;" bgcolor="#ffffff"><a target="_blank" href="https://jaylimovegas.com/cookies-policy" style="color: #999999;white-space: nowrap">Cookies Policy</a></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" align="center">
                                                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-text" esd-links-color="#262728"><a class="esd-anchor" name="ert" style="color: #262728;"></a>
                                                                                                <p><a target="_blank" href="https://jaylimovegas.com" style="color: #262728;">www.jaylimovegas.com</a></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe esd-synchronizable-module" align="center">
                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p20" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
    
    </html>
`
}

module.exports = {
    paymentReceipt,
    serviceHtml,
    generateHtml
}