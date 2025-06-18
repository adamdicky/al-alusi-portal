import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplatePhase4Accept } from "@/components/EmailP4Accept";
import React from "react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const user = await authorized("staff_jabatan");
		if (!user) {
			return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
		}

		const { application_id, invitation_date, testiv_mark, invitation_time } = await req.json();
		if (!application_id || !invitation_date || !testiv_mark || !invitation_time) {
			return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
		}

		// Format the invitation_date to a human-readable string
		const myTimeZone = 'Asia/Kuala_Lumpur';
		const localDate = toZonedTime(invitation_date, myTimeZone);
		const formattedDate = format(localDate, 'EEEE, MMMM d, yyyy'); // example: "June 30, 2025"
		

		const supabase = await createClient();
		const now = new Date().toISOString();

		const { data: application, error: applicationError } = await supabase
			.from("application")
			.select("emailcontact, father_information, mother_information, student_information, invitation_time")
			.eq("id", application_id)
			.single();

		if (applicationError) throw applicationError;

		
		// const formattedTime = format(new Date(application.invitation_time), "hh:mm:ss");
		const [hours, minutes] = invitation_time.split(':').map(Number); // or invitation_time
		const dummyDate = new Date(1970, 0, 1, hours, minutes);
		const zonedTime = toZonedTime(dummyDate, myTimeZone);
		const formattedTime = format(zonedTime, 'hh:mm a');
		console.log("Raw time from Supabase:", application.invitation_time); // or .invitation_time

		const { data: father, error: fatherError } = await supabase
			.from("father")
			.select("name")
			.eq("id", application.father_information)
			.single();

		if (fatherError) throw fatherError;

		const { data: mother, error: motherError } = await supabase
			.from("mother")
			.select("name")
			.eq("id", application.mother_information)
			.single();

		if (motherError) throw motherError;

		const { data: student, error: studentError } = await supabase
			.from("student")
			.select("name")
			.eq("id", application.student_information)
			.single();

		if (studentError) throw studentError;

		const { error } = await supabase
			.from("application")
			.update({
				is_reviewed: true,
				reviewed_at: now,
				invitation_date,
				invitation_time,
				testiv_mark,
				phase_status: "accepted",
				last_updated: now,
			})
			.eq("id", application_id);

		if (error) throw error;

		await resend.emails.send({
			from: 'SIRAJ Al-Alusi <onboarding@resend.dev>',
			to: [application.emailcontact],
			subject: 'SIRAJ Al-Alusi: Great news!',
			react: React.createElement(EmailTemplatePhase4Accept, {
				fathername: father.name, 
				mothername: mother.name, 
				studentname: student.name, 
				registrationDate: formattedDate,
				registrationTime: formattedTime,
			}),
		});

		return NextResponse.json({ msg: "Student approved (invitation date set)" }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unable to approve student" }, { status: 500 });
	}
}
