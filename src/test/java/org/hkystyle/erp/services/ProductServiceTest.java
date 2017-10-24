package org.hkystyle.erp.services; 

import com.alibaba.fastjson.JSON;
import org.hkystyle.erp.Application;
import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.product.Product;
import org.hkystyle.erp.domain.models.product.dto.ListProductDTO;
import org.hkystyle.erp.domain.models.product.enums.ProductState;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;

/** 
* ProductService Tester. 
* 
* @author <hukaiyang> 
* @since <pre>十月 15, 2017</pre> 
* @version 1.0 
*/ 

@SpringBootTest(classes = Application.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class ProductServiceTest {
    @Autowired
    private ProductService productService;

    @Before
    public void before() throws Exception { 
    } 
    
    @After
    public void after() throws Exception { 
    } 
    
        /** 
    * 
    * Method: insert(final Product product) 
    * 
    */ 
    @Test
    public void testInsert() throws Exception {
        final Product product = new Product();
        product.setName("九天凤舞");
        product.setSellingUnit("组");
        product.setSellingPrice(BigDecimal.valueOf(9999));
        product.setSpecName("9箱/组");
        product.setCreateTime("2017-10-15 15:44:11");
        product.setCreateUserId(1219);
        final Integer id = productService.insert(product);
        System.out.println("新增成功，产品 Id 为：" + id);
    }

    @Test
    public void testlistProduct() {
        final ListProductDTO productDTO = new ListProductDTO();
        productDTO.setProductName(null);
        productDTO.setState(null);
        final PageList<Product> pageList = productService.listProduct(productDTO);
        System.out.println(JSON.toJSONString(pageList));
    }

    @Test
    public void testgetProduct() {
        final Product product = productService.getProduct(1);
        System.out.println(JSON.toJSONString(product));
    }

    @Test
    public void testUpdate() {
        final Product product = new Product();
        product.setId(6);
        product.setName("烟花");
        product.setSpecName("箱");
        product.setSellingPrice(BigDecimal.valueOf(1000));
        product.setSellingUnit("箱");
        product.setState(ProductState.上架.ordinal());
        productService.update(product);
    }
    
        
}
