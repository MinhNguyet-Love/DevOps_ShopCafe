package com.shopcafe.backend.repo;

import com.shopcafe.backend.model.CafeTable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CafeTableRepository extends MongoRepository<CafeTable, String> {}
