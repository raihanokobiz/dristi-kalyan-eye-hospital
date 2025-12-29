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
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Label } from "@/components/ui/label";
import { createFormAction } from "./actions";
import { useRouter } from "next/navigation";
import { uploadImageToCloudinary } from "@/services/cloudinary/cloudinary";
import { Switch } from "antd";
import { formSchema } from "./form-schema";

const defaultValues = {
  title: "",
  description: "",
  price: "",
  slug: "",
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

      // Image upload to Cloudinary
      const imageFile = values.image[0];
      const imageUploadResult = await uploadImageToCloudinary(imageFile, "services");

      // FormData preparation
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("slug", values.slug || "");
      formData.append("status", values.status.toString());
      formData.append("image", imageUploadResult?.secure_url || "");
      formData.append("imagePublicId", imageUploadResult?.public_id || "");



      await createFormAction(formData);
      form.reset();
      setFileList([]);
      toast({
        title: "Success",
        description: "Service created successfully",
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


  return (
    <Card className="m-6 mt-1 p-4 rounded-lg">
      <Label className="text-xl font-semibold mb-4">Service Create</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-2">
          <div className=" grid grid-cols-4 gap-4 mb-6">
            {/* Name Field */}
            <div className="col-span-3 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Service Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.title?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.description?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.price?.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Status */}
                <div>
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
              </div>
            </div>
            <div className="col-span-1">
              {/* Profile Picture */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Image <b className="text-red-500">*</b>
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
    </Card >
  );
};
