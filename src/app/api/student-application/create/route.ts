import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

interface FatherInfo {
	name: string;
	phone_number: string;
	race: string;
	nationality: string;
	occupation: string;
	income: string;
	home_address: string;
	office_address: string;
	office_phone_number: string;
}

interface MotherInfo {
	name: string;
	phone_number: string;
	race: string;
	nationality: string;
	occupation: string;
	income: string;
	home_address: string;
	office_address: string;
	office_phone_number: string;
}

interface StudentInfo {
	requested_class: string;
	requested_year: string;
	requested_school: string;
	name: string;
	birth_cert_number: string;
	ic_number: string;
	gender: string;
	nationality: string;
	date_of_birth: string;
	place_of_birth: string;
	kindergarten_name: string;
	primary_school_name: string;
	primary_school_session: string;
}

export async function POST(req: NextRequest) {
	try {
		const form = await req.json();

		if (!form) {
			return NextResponse.json({ msg: "the form needs to be complete" }, { status: 400 });
		}

		const supabase = await createClient();

		const fatherInfo: FatherInfo = {
			name: form.father_name,
			phone_number: form.father_phone,
			race: form.father_race,
			nationality: form.father_nationality,
			occupation: form.father_occupation,
			income: form.father_income,
			office_address: form.father_office,
			office_phone_number: form.father_office_phone,
			home_address: form.father_home_address,
		};

		const motherInfo: MotherInfo = {
			name: form.mother_name,
			phone_number: form.mother_phone,
			race: form.mother_race,
			nationality: form.mother_nationality,
			occupation: form.mother_occupation,
			income: form.mother_income,
			office_address: form.mother_office,
			office_phone_number: form.mother_office_phone,
			home_address: form.father_home_address,
		};

		const studentInfo: StudentInfo = {
			requested_class: form.requested_class,
			requested_year: form.for_year,
			requested_school: form.requested_school,
			name: form.student_name,
			birth_cert_number: form.birth_cert_no,
			ic_number: form.ic_number,
			gender: form.gender,
			nationality: form.nationality,
			date_of_birth: form.date_of_birth,
			place_of_birth: form.place_of_birth,
			kindergarten_name: form.kindergarten,
			primary_school_name: form.primary_school,
			primary_school_session: form.primary_session,
		};

		const { error: insertFatherError } = await supabase.from("father").insert({
			...fatherInfo,
		});

		if (insertFatherError) throw insertFatherError;

		const { error: insertMotherError } = await supabase.from("mother").insert({
			...motherInfo,
		});

		if (insertMotherError) throw insertMotherError;

		const { error: insertStudentError } = await supabase.from("student").insert({
			...studentInfo,
		});

		if (insertStudentError) throw insertStudentError;

		const { error: insertApplicationError } = await supabase.from("application").insert({
			last_updated: new Date().toISOString(),
			phase_status: 2,
			is_reviewed: false,
		});

		if (insertApplicationError) throw insertApplicationError;

		return NextResponse.json({ fatherInfo, motherInfo, studentInfo });
	} catch (error) {
		console.error("Submit Error:", error);
		return NextResponse.json({ msg: "Unexpected error occurred." }, { status: 500 });
	}
}
