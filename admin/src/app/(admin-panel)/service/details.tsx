"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MoreHorizontal,
  Upload as LucideUpload,
  Paperclip,
  FileUp,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { deleteAction, updateFormAction } from "./actions";
import { confirmation } from "@/components/modals/confirm-modal";
import { formSchema } from "./form-schema";
import { BASE_URL } from "@/config/config";
import { Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { humanFileSize } from "@/utils/helpers";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/services/cloudinary/cloudinary";
import { TDoctor } from "./types";

interface Props {
  item: TDoctor;
}

export const DetailsSheet: React.FC<Props> = ({ item }) => {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile<any>[]>([
    {
      uid: "-1",
      name: String(item.image).split("/").pop() || "",
      status: "done",
      url: item.image,
    },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      degree: item.degree,
      visitingTime: item.visitingTime,
      phone: item.phone,
      email: item.email || "",
      availableDays: item.availableDays || [],
      image: [],
      consultationFee: item.consultationFee,
      status: item.status
    },
  });

  const handleImageFileChange = ({ fileList }: any) => {
    setImageFileList(fileList);

    const rawFiles = fileList
      .map((file: any) => file.originFileObj)
      .filter(Boolean);

    // Sync with react-hook-form
    form.setValue("image", rawFiles);
  };


  const onSubmitUpdate = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "OK_____________________________________________");

    setUpdating(true);
    try {

      let imageUrl = item.image;
      let imagePublicId = item.imagePublicId || "";

      // new image upload
      if (values.image && values.image.length > 0) {
        // old image delete
        if (item.imagePublicId) {
          await deleteImageFromCloudinary(item.imagePublicId);
        }

        // new image upload
        const uploadResult = await uploadImageToCloudinary(
          values.image[0],
          "doctors"
        );
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      }

      // FormData
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("degree", values.degree);
      formData.append("visitingTime", values.visitingTime);
      formData.append("consultationFee", values.consultationFee.toString());
      formData.append("availableDays", JSON.stringify(values.availableDays));
      formData.append("phone", values.phone);
      formData.append("email", values.email || "");
      formData.append("status", values.status.toString());
      formData.append("image", imageUrl);
      formData.append("imagePublicId", imagePublicId);

      await updateFormAction(String(item._id), formData);
      toast({
        title: "Doctor updated successfully",
      });
      setSheetOpen(false);
    } catch (error: any) {
      toast({
        title: "Failed to update item",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = async () => {
    if (await confirmation("Are you sure you want to delete this item?")) {
      setDeleting(true);

      try {
        if (item.imagePublicId) {
          await deleteImageFromCloudinary(item.imagePublicId);
        }

        if (item.vectorImagePublicId) {
          await deleteImageFromCloudinary(item.vectorImagePublicId);
        }

        const deleted = await deleteAction(String(item._id));
        if (deleted) {
          toast({
            title: "Doctor deleted successfully",
          });
          setSheetOpen(false);
        }
      } catch (error: any) {
        toast({
          title: "Failed to delete item",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setDeleting(false);
      }
    } else {
      setDeleting(false);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:max-w-[750px] overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Doctor Details</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitUpdate)}
            className="grid grid-cols-2 gap-4 items-end py-4"
          >
            {/* Name Field */}
            <div className="col-span-2">
              {[
                ["name", "Doctor Name"],
                ["degree", "Degree"],
                ["visitingTime", "Visiting Time"],
                ["phone", "Phone"],
                ["email", "Email"],
              ].map(([name, label]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as any}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        {form.formState.errors[name as any]?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* AVAILABLE DAYS */}
            <FormField
              control={form.control}
              name="availableDays"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Available Days</FormLabel>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ].map((day) => (
                      <label key={day} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={field.value.includes(day)}
                          onChange={(e) =>
                            field.onChange(
                              e.target.checked
                                ? [...field.value, day]
                                : field.value.filter((d) => d !== day)
                            )
                          }
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Consultation Fee */}
            <FormField
              control={form.control}
              name="consultationFee"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Consultation Fee</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.consultationFee?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

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
            {/* Image */}
            <div className="col-span-1 grid grid-cols-2">
              <div className="">
                <Label>
                  Image <b className="text-red-500">*</b>
                </Label>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div>
                      <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        fileList={imageFileList}
                        onChange={handleImageFileChange}
                      >
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </div>
                  )}
                />

                <div className="mt-4">
                  {form.getValues("image") &&
                    form.getValues("image").length > 0 &&
                    form.getValues("image").map((file, i) => (
                      <div className="border-dashed border-2 rounded-lg p-2 px-3">
                        <div
                          key={i}
                          className="flex flex-col gap-2 text-xs text-gray-500 justify-center h-full"
                        >
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileUp className="h-4 w-4 stroke-current" />
                            <span>{humanFileSize(file.size)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="text-red-400 text-xs min-h-4">
                  {form.formState.errors.image?.message}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex gap-3 mt-4">
              <Button type="submit" variant="default" loading={updating}>
                Update
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteClick}
                loading={deleting}
              >
                Delete
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
