import { Hops } from '../types';

interface TrackingCarrier {
	name: string;
	pattern: RegExp;
	trackingUrl: (trackingNumber: string) => URL;
}

const carriers: TrackingCarrier[] = [
	{
		name: 'USPS',
		pattern: /^(94\d{20}|92\d{20}|93\d{20}|82\d{8}|EC\d{9}US|CP\d{9}US|LK\d{9}US|EH\d{9}US|LC\d{9}US|LN\d{9}US|UD\d{9}US|UP\d{9}US|UR\d{9}US|VA\d{9}US|VC\d{9}US|VD\d{9}US)$/,
		trackingUrl: (num) => new URL(`https://tools.usps.com/go/TrackConfirmAction?tLabels=${num}`)
	},
	{
		name: 'UPS',
		pattern: /^(1Z[0-9A-Z]{16}|T\d{10}|[\d]{9})$/,
		trackingUrl: (num) => new URL(`https://www.ups.com/track?tracknum=${num}`)
	},
	{
		name: 'FedEx',
		pattern: /^(\d{12}|\d{14}|\d{15}|\d{20}|96\d{20})$/,
		trackingUrl: (num) => new URL(`https://www.fedex.com/fedextrack/?tracknumbers=${num}`)
	},
	{
		name: 'DHL',
		pattern: /^(\d{10,11}|[A-Z]{3}\d{7})$/,
		trackingUrl: (num) => new URL(`https://www.dhl.com/us-en/home/tracking/tracking-ecommerce.html?submit=1&tracking-id=${num}`)
	},
	{
		name: 'Amazon',
		pattern: /^TBA\d{12}$/,
		trackingUrl: (num) => new URL(`https://track.amazon.com/tracking/${num}`)
	},
	{
		name: 'OnTrac',
		pattern: /^(C\d{14}|D\d{13})$/,
		trackingUrl: (num) => new URL(`https://www.ontrac.com/trackres.asp?tracking_number=${num}`)
	},
	{
		name: 'LaserShip',
		pattern: /^(LS\d{8,10}|1LS\d{11})$/,
		trackingUrl: (num) => new URL(`https://www.lasership.com/track/${num}`)
	}
];

export class TrackingNumber extends Hops {
	static doc = 'Package Tracking (Auto-detects USPS, UPS, FedEx, DHL, Amazon, OnTrac, LaserShip)';
	
	static query(q: string): URL | null {
		const cleanQuery = q.trim().replace(/\s+/g, '').toUpperCase();
		
		for (const carrier of carriers) {
			if (carrier.pattern.test(cleanQuery)) {
				return carrier.trackingUrl(cleanQuery);
			}
		}
		
		return null;
	}
	
	static extract(q: string): string | null {
		// Not applicable for tracking numbers
		return null;
	}
}