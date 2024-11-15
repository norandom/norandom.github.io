---
title: "TWS Python API Market Parameters and Scanners"
source: "https://www.interactivebrokers.com/campus/trading-lessons/tws-python-api-market-parameters-and-scanners/"
author:
  - "[[https://www.interactivebrokers.com/campus/trading-lessons/tws-python-api-market-parameters-and-scanners/]]"
published: 2022-11-23
created: 2024-11-11
description: "In this lesson, we will walk through how to request market scanner parameters using the TWS Python API, and how to request the TWS market scanner itself."
tags:
  - "clippings"
---
Welcome. In this lesson, we will be discussing how to request market scanner parameters, and how to request the market scanner itself.

To begin, we will need to understand which parameters we want to request. This is not technically required, though it would be suggested to be sent before your first ever request. This list is also updated periodically, so you may also wish to make a new call for this list to review it from time to time.

#### **Access Market Scanner Parameters**

For this initial program, I will use my simple TestApp class, and in my nextValidId method, I will make a simple call to self.reqScannerParameters(). Next, I can define my scannerParameters method, and I will only receive self and xml therein.

Within my scannerParameters function, I will use some file manipulation to save these details, instead of our usual print. I will save my XML file to my python samples directory, TWS API}samplesPythonTestbed.

I will set that directory to a variable string labelled dir. Then I can type open(dir,’w’).write(xml) to write my whole xml string to that file. Then I can create a quick print statement to say, “Scanner Parameters Received.”

Then I can end my file with my standard app, connect, and run combination I have used in some of our other videos.

I would like to stress that I am saving these details to a file instead of my usual print structure because there is a massive amount of data returned here. And at least in my case, my terminal cannot print all of this data. As a point of reference, this xml file is approximately 2 megabytes.

Now if we run this, we will find the file saved in our Testbed directory. I can open this file up with Visual Studio Code and see all the values present. This list is quite large, so we would encourage you to explore this to find exactly what you are looking for.

If I scroll down a bit, we can see **STK.NASDAQ** for example, or **STK.BATS**.

In addition to being able to refine my search for specific value requirements, we can use these location codes to specify the exchanges we would like to operate with. This isn’t unique for just US exchanges.

We can refine this for any country. If I search the document, I will be able to see we have scanners for Hong Kong, Korea, Belgium and more.

Moving in towards the actual filters made available to us, we can see further refinement still. We are able to see values for Volume, or perhaps going through usdVolume so we may see the total value as opposed to share quantity.

I can search nearly any tag from the Trader Workstation, and those values should be made available here. We can search for priceAbove or a variety of 52 Week calculations for stocks, options, and so on.

With the scanner parameters in place, we are set to request the market scanner.  I will be using the same values here that I was using before, with my class, nextValidId. I will once again be import TagValue using “from **ibapi.tag\_value import \***”.

With my basic outline created, I can start building my scanner. I want to receive top stock info for the US. I will start by setting sub to ScannerSubscription() to sub as a variable. Then I will set sub.instrument = “STK”, which uses the “Instruments” tag in the XML file. Per my scanner parameters document, I can include **sub.locationCode = “STK.US.MAJOR”** from the locationCode tag.  This will give me all major exchanges in the US, including NYSE, Nasdaq, Amex and more.

I will use the scan code “**TOP\_OPEN\_PERC\_GAIN**” which is based on the scanCode tag in that scanner parameters document.

I will now create a quick variable labelled scan\_options as an empty list. And now I can create another list for filter\_options. In the filter options list, I will add a few filters I want to specify for my request.

First, I will add TagValue(“volumeAbove”, “10000”) so I can receive only stocks with a volume over 10000.

Then I can add something like TagValue(“marketCapBelow”, “1000”). This would further refine my list to contracts with a lower market cap still.

And finally, I will set TagValue(“priceAbove”, “1’). This will filter out penny stocks, or anything below 1 USD.

All of these values are listed as a filter option within our scanner parameters xml file we downloaded before.

There is no limit to how much or little refinement you can choose to include here, so feel free to experiment. With that said, not every inquiry will result in a response however, as logic will still apply in this scenario.

For example, if I make a call for “Curr Year Earnings Per Share Above” I can set any earnings threshold I like. If I enter a value of 100, while my program will certainly let me make the request, but I must also understand that a company will not make $100 per share for themselves. And so, I can balance my values to return something more realistic like $10.

With that said, let’s go ahead and create our market scanner request. This requires our self.reqScannerSubscription request, and we will include a request ID, our sub variable for our Scanner Subscription object. Then we can add our scan\_options list, and then our filter\_options list.

We can quickly mov through our EWrapper object.

As you might expect, this is simply def scannerData. This includes variables for self, reqId, and then the contracts rank, contract details, and then distance, benchmark, projection, and legsStr. And then, as usual, I will print out all of these values. Our variables after contractDetails are values which may or may not return depending on your scanner request. You will not always receive legsStr for example, as you may not receive values for combos in your requests.

Now, moving on, we have our scannerDataEnd method, that simply includes self and the request ID. Typically I note that this is an optional field, though that is not necessary the case for scanner subscriptions. If the subscription is not closed, then you will receive an error regarding a duplicate scanner id on future requests.. And so, I will add in here a quick print that we are at the scanner data end. Then I can add self.cancelScannerSubscription and only include the request ID. After my cancellation, in my case I will make my typical call to self.disconnect().

If I run our code. I can see my usual error codes returned. Now I can also see each rank in my request, starting from rank 0 all the way to rank 49. This will only provide data with respect to the position and contract information.

This is a very basic list to get you started. Keep in mind that you can use market scanners with any other security, like options or futures, but you will need to be sure your Tag Values match up accordingly.

In a future video, we will dive into these issues more in depth to see how we can request market data from the market scanner. This concludes our video on Market Scanners in the TWS API. Thank you for watching, and we look forward to having you join us for more TWS Python API lessons.

[Market Scanners – API User Guide & Examples](https://interactivebrokers.github.io/tws-api/market_scanners.html)

#### Scanner Parameters

from ibapi.client import \*

from ibapi.wrapper import \*

class TestApp(EClient, EWrapper):

EClient.\_\_init\_\_(self, self)

def nextValidId(self, orderId: int):

self.reqScannerParameters()

def scannerParameters(self, xml):

dir = "C:\\\\IBKR\\\\TWS API\\\\samples\\\\Python\\\\Testbed\\\\Traders Academy\\\\scanner.xml"

open(dir, 'w').write(xml)

print("Scanner parameters received!")

app.connect("127.0.0.1", port, 1001)

from ibapi.client import \* from ibapi.wrapper import \* port = 7497 class TestApp(EClient, EWrapper): def \_\_init\_\_(self): EClient.\_\_init\_\_(self, self) def nextValidId(self, orderId: int): self.reqScannerParameters() def scannerParameters(self, xml): dir = "C:\\\\IBKR\\\\TWS API\\\\samples\\\\Python\\\\Testbed\\\\Traders Academy\\\\scanner.xml" open(dir, 'w').write(xml) print("Scanner parameters received!") app = TestApp() app.connect("127.0.0.1", port, 1001) app.run()

```
from ibapi.client import *
from ibapi.wrapper import *

port = 7497

class TestApp(EClient, EWrapper):
    def __init__(self):
        EClient.__init__(self, self)

    def nextValidId(self, orderId: int):
        self.reqScannerParameters()

    def scannerParameters(self, xml):
        dir = "C:\\IBKR\\TWS API\\samples\\Python\\Testbed\\Traders Academy\\scanner.xml"
        open(dir, 'w').write(xml)
        print("Scanner parameters received!")

app = TestApp()
app.connect("127.0.0.1", port, 1001)
app.run()
```

#### Scanner Subscription

from ibapi.client import \*

from ibapi.wrapper import \*

from ibapi.tag\_value import \*

class TestApp(EClient, EWrapper):

EClient.\_\_init\_\_(self, self)

def nextValidId(self, orderId: int):

sub = ScannerSubscription()

sub.locationCode = "STK.US.MAJOR"

sub.scanCode = "TOP\_OPEN\_PERC\_GAIN"

TagValue("volumeAbove","10000"),

TagValue("marketCapBelow1e6", "1000"),

TagValue("priceAbove", '1')

self.reqScannerSubscription(orderId, sub, scan\_options, filter\_options)

def scannerData(self, reqId, rank, contractDetails, distance, benchmark, projection, legsStr):

print(f"scannerData. reqId: {reqId}, rank: {rank}, contractDetails: {contractDetails}, distance: {distance}, benchmark: {benchmark}, projection: {projection}, legsStr: {legsStr}.")

def scannerDataEnd(self, reqId):

self.cancelScannerSubscription(reqId)

app.connect("127.0.0.1", port, 1001)

from ibapi.client import \* from ibapi.wrapper import \* from ibapi.tag\_value import \* port = 7497 class TestApp(EClient, EWrapper): def \_\_init\_\_(self): EClient.\_\_init\_\_(self, self) def nextValidId(self, orderId: int): sub = ScannerSubscription() sub.instrument = "STK" sub.locationCode = "STK.US.MAJOR" sub.scanCode = "TOP\_OPEN\_PERC\_GAIN" scan\_options = \[\] filter\_options = \[ TagValue("volumeAbove","10000"), TagValue("marketCapBelow1e6", "1000"), TagValue("priceAbove", '1') \] self.reqScannerSubscription(orderId, sub, scan\_options, filter\_options) def scannerData(self, reqId, rank, contractDetails, distance, benchmark, projection, legsStr): print(f"scannerData. reqId: {reqId}, rank: {rank}, contractDetails: {contractDetails}, distance: {distance}, benchmark: {benchmark}, projection: {projection}, legsStr: {legsStr}.") def scannerDataEnd(self, reqId): print("ScannerDataEnd!") self.cancelScannerSubscription(reqId) self.disconnect() app = TestApp() app.connect("127.0.0.1", port, 1001) app.run()

```
from ibapi.client import *
from ibapi.wrapper import *
from ibapi.tag_value import *

port = 7497

class TestApp(EClient, EWrapper):
    def __init__(self):
        EClient.__init__(self, self)

    def nextValidId(self, orderId: int):
        sub = ScannerSubscription()
        sub.instrument = "STK"
        sub.locationCode = "STK.US.MAJOR"
        sub.scanCode = "TOP_OPEN_PERC_GAIN"

        scan_options = []
        filter_options = [
            TagValue("volumeAbove","10000"),
            TagValue("marketCapBelow1e6", "1000"),
            TagValue("priceAbove", '1')
        ]

        self.reqScannerSubscription(orderId, sub, scan_options, filter_options)

    def scannerData(self, reqId, rank, contractDetails, distance, benchmark, projection, legsStr):
        print(f"scannerData. reqId: {reqId}, rank: {rank}, contractDetails: {contractDetails}, distance: {distance}, benchmark: {benchmark}, projection: {projection}, legsStr: {legsStr}.")

    def scannerDataEnd(self, reqId):
        print("ScannerDataEnd!")
        self.cancelScannerSubscription(reqId)
        self.disconnect()

app = TestApp()
app.connect("127.0.0.1", port, 1001)
app.run()
```

###### Disclosure: Interactive Brokers

The analysis in this material is provided for information only and is not and should not be construed as an offer to sell or the solicitation of an offer to buy any security. To the extent that this material discusses general market activity, industry or sector trends or other broad-based economic or political conditions, it should not be construed as research or investment advice. To the extent that it includes references to specific securities, commodities, currencies, or other instruments, those references do not constitute a recommendation by IBKR to buy, sell or hold such investments. This material does not and is not intended to take into account the particular financial conditions, investment objectives or requirements of individual customers. Before acting on this material, you should consider whether it is suitable for your particular circumstances and, as necessary, seek professional advice.

The views and opinions expressed herein are those of the author and do not necessarily reflect the views of Interactive Brokers, its affiliates, or its employees.

###### Disclosure: API Examples Discussed

Throughout the lesson, please keep in mind that the examples discussed are purely for technical demonstration purposes, and do not constitute trading advice. Also, it is important to remember that placing trades in a paper account is recommended before any live trading.

###### Disclosure: Displaying Symbols on Video

Any stock, options or futures symbols displayed are for illustrative purposes only and are not intended to portray recommendations.