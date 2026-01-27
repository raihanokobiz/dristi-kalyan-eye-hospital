"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./form-schema";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Label } from "@/components/ui/label";
import { createFormAction } from "./actions";
import { useRouter } from "next/navigation";
import { uploadImageToCloudinary } from "@/services/cloudinary/cloudinary";
import { Switch } from "antd";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { resizeImage } from "@/utils/resizeImage";

const defaultValues = {
  name: "",
  degree: "",
  visitingTimeStart: "",
  visitingTimeEnd: "",
  consultationFee: 0,
  availableDays: [],
  phone: "",
  email: "",
  gender: "male" as "male" | "female",
  status: true,
  image: [],
};

export const CreateForm: React.FC = () => {
  const { toast } = useToast();
  const [fileList, setFileList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleImageFileChange = ({ fileList }: any) => {
    const latestFileList = fileList.slice(-1);
    setFileList(latestFileList);

    const rawFiles = latestFileList
      .map((f: any) => f.originFileObj)
      .filter(Boolean);
    form.setValue("image", rawFiles);
  };



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {

      let imageUrl = "";
      let imagePublicId = "";

      // Image upload to Cloudinary (optional)
      if (values.image && values.image.length > 0) {
        const rawImage = values.image[0];
        const optimizedImage = await resizeImage(rawImage);

        const imageUploadResult = await uploadImageToCloudinary(
          optimizedImage,
          "doctors"
        );
        imageUrl = imageUploadResult.secure_url;
        imagePublicId = imageUploadResult.public_id;
      }

      const visitingTime = `${values.visitingTimeStart} - ${values.visitingTimeEnd}`;

      // FormData preparation
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("degree", values.degree);
      formData.append("visitingTime", visitingTime);
      formData.append("consultationFee", values.consultationFee.toString());
      formData.append("availableDays", JSON.stringify(values.availableDays));
      formData.append("phone", values.phone);
      formData.append("email", values.email || "");
      formData.append("gender", values.gender);
      formData.append("status", values.status.toString());
      if (imageUrl) formData.append("image", imageUrl);
      if (imagePublicId) formData.append("imagePublicId", imagePublicId);


      await createFormAction(formData);
      form.reset();
      setFileList([]);
      toast({
        title: "Success",
        description: "Doctor created successfully",
      });
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const daysOptions = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const


  return (
    <Card className="m-6 mt-1 p-4 rounded-lg">
      <Label className="text-xl font-semibold mb-4">Create Doctor</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-2">
          <div className=" grid grid-cols-4 gap-4 mb-6">
            {/* Name Field */}
            <div className="col-span-3 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Doctor Name <b className="text-red-500">*</b>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Doctor name" {...field} />
                        </FormControl>
                        <FormDescription className="text-red-400 text-xs min-h-4">
                          {form.formState.errors.name?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Degree */}
                <div>
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Degree <b className="text-red-500">*</b></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter degree" {...field} />
                        </FormControl>
                        <FormDescription className="text-red-400 text-xs min-h-4">
                          {form.formState.errors.degree?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Gender */}
                <div>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Gender <b className="text-red-500">*</b></FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </FormControl>
                        <FormDescription className="text-red-400 text-xs min-h-4">
                          {form.formState.errors.gender?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">
                {/* Visiting Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1.5">
                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name="visitingTimeStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Visiting Start Time <b className="text-red-500">*</b></FormLabel>
                        <FormControl>
                          <TimePicker
                            onChange={field.onChange}
                            value={field.value}
                            disableClock
                            format="h:mm a"
                            clearIcon={null}
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name="visitingTimeEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visiting End Time <b className="text-red-500">*</b></FormLabel>
                        <FormControl>
                          <TimePicker
                            onChange={field.onChange}
                            value={field.value}
                            disableClock
                            format="h:mm a"
                            clearIcon={null}
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Consultation Fee */}
                <div>
                  <FormField
                    control={form.control}
                    name="consultationFee"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Consultation Fee <b className="text-red-500">*</b></FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter fee" {...field} />
                        </FormControl>
                        <FormDescription className="text-red-400 text-xs min-h-4">
                          {form.formState.errors.consultationFee?.message}
                        </FormDescription>
                      </FormItem>
                    )}

                  />
                </div>
              </div>
              {/* Available Days */}
              <FormField
                control={form.control}
                name="availableDays"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Available Days <b className="text-red-500">*</b></FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {daysOptions.map((day) => (
                          <label key={day} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              value={day}
                              checked={field.value?.includes(day)}
                              onChange={(e) => {
                                const updatedDays = e.target.checked
                                  ? [...(field.value || []), day]
                                  : field.value?.filter((d) => d !== day);
                                field.onChange(updatedDays);
                              }}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <span>{day}</span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.errors.availableDays?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Phone */}
                <div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Phone Number <b className="text-red-500">*</b></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormDescription className="text-red-400 text-xs min-h-4">
                          {form.formState.errors.phone?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Email */}
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormDescription className="text-red-400 text-xs min-h-4">
                          {form.formState.errors.email?.message}
                        </FormDescription>
                      </FormItem>
                    )}

                  />
                </div>
              </div>
              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={field.value}
                          onClick={() => field.onChange(!field.value)}
                          className={` relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${field.value ? "bg-primary" : "bg-gray-300"}`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${field.value ? "translate-x-9" : "translate-x-1"} `}
                          />
                        </button>
                        <span
                          className={`font-medium ${field.value ? "text-primary" : "text-gray-500"
                            }`}
                        >
                          {field.value ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.errors.status?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              {/* Profile Picture */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Image
                    </FormLabel>
                    <Upload
                      listType="picture-card"
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={handleImageFileChange}
                      maxCount={1}
                    >
                      {fileList.length < 1 && (
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload Image</div>
                        </div>
                      )}
                    </Upload>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
