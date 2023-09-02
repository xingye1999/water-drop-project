import TypeSelect from "@/components/TypeSelect"
import { useEditProductInfo, useProductInfo } from "@/services/product"
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
} from "antd"
import TextArea from "antd/lib/input/TextArea"
import UploadImage from "@/components/OSSImageUpload"
import { useState } from "react"

interface IProps {
  id?: string
  onClose: (isReload?: boolean) => void
}

const EditProduct = ({ onClose, id }: IProps) => {
  const [form] = Form.useForm()
  const [edit, editLoading] = useEditProductInfo()
  const { data, loading } = useProductInfo(id)
  const [open, setOpen] = useState(true)

  const onSubmitHandler = async () => {
    const values = await form.validateFields()
    if (values) {
      //可复用
      const newValues = {
        ...values,
        coverUrl: values.coverUrl[0].url,
        bannerUrl: values.bannerUrl[0].url,
      }
      edit(id, newValues, onClose)
    }
  }

  return (
    <Drawer
      title={id ? "编辑商品" : "新建商品"}
      width={1000}
      forceRender
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button
            loading={editLoading}
            onClick={onSubmitHandler}
            type="primary"
          >
            提交
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        {(data || !id) && (
          <Form
            form={form}
            initialValues={data}
          >
            <Row gutter={20}>
              <Col span={18}>
                <Form.Item
                  style={{ width: "100%" }}
                  label="名称"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="商品分类"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <TypeSelect />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={6}>
                <Form.Item
                  label="库存总额"
                  name="stock"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="原价"
                  name="originalPrice"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="优惠价"
                  name="preferentialPrice"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="每人限购数量"
                  name="limitBuyNumber"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="商品简介"
              name="desc"
              rules={[{ required: true }]}
            >
              <TextArea
                maxLength={200}
                rows={5}
                allowClear
                showCount
              />
            </Form.Item>
            <Divider>图片设置</Divider>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="coverUrl"
                  label="商品封面图：图片长宽要求比例为 16:9 "
                  rules={[{ required: true }]}
                  labelCol={{
                    span: 24,
                  }}
                >
                  <UploadImage
                    maxCount={1}
                    imgCropAspect={16 / 9}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="bannerUrl"
                  label="商品 Banner 横图：图片长宽要求比例为 16:9 "
                  rules={[{ required: true }]}
                  labelCol={{
                    span: 24,
                  }}
                >
                  <UploadImage
                    maxCount={1}
                    imgCropAspect={16 / 9}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Spin>
    </Drawer>
  )
}

EditProduct.defaultProps = {
  id: "",
}

export default EditProduct
